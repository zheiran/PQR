# Create your views here.
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Group
from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.db import connection
import datetime

from .forms import RegistroForm
from modelos.models import Flujo_de_trabajo, Pasos, Solicitudes, Solicitudes_logs

def inicio(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('home'))
        else:
            return HttpResponseRedirect(reverse('inicio'))
    else:
        form = RegistroForm()
    return render(request, "login/index.html", {'form': form})

def registro(request):
    if request.method == 'POST':  # If the form has been submitted...
        form = RegistroForm(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass
 
            # Process the data in form.cleaned_data
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            email = form.cleaned_data["email"]
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            grupo = Group.objects.filter(name="Estudiante")
            user = User.objects.get(pk=user.id)
            if grupo.exists():
                user.groups.add(grupo[0])
            else:
                grupo = Group(name="Estudiante")
                grupo.save()
                user.groups.add(grupo)
 
            return HttpResponseRedirect(reverse('inicio'))  # Redirect after POST
    else:
        form = RegistroForm()

    return render(request, "login/registro.html", {'form': form})

@login_required
def home(request):
    cursor = connection.cursor()
    if request.user.groups.filter(name='Estudiante').exists():
        cursor.execute("SELECT s.id, s.fecha, s.respuesta, f.nombre as proceso, u.first_name, u.last_name FROM modelos_solicitudes s INNER JOIN modelos_flujo_de_trabajo f ON f.id = s.flujos_id INNER JOIN auth_user u ON u.id = s.usuario_id WHERE s.usuario_id = %s", [request.user.id])
    elif request.user.groups.filter(name='Agente').exists():
        cursor.execute("SELECT s.id, s.fecha, s.respuesta, f.nombre as proceso, u.first_name, u.last_name FROM modelos_solicitudes_logs sl INNER JOIN modelos_solicitudes s ON s.id = sl.solicitudes_id INNER JOIN modelos_flujo_de_trabajo f ON f.id = s.flujos_id INNER JOIN auth_user u ON u.id = s.usuario_id WHERE (sl.comentarios = '') IS NOT FALSE AND sl.usuario_id = %s", [request.user.id])
    else:
        return HttpResponseRedirect(reverse('workflowList'))
    solicitudes = dictfetchall(cursor)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM modelos_flujo_de_trabajo WHERE publicado = TRUE")
    procesos = dictfetchall(cursor)
    cursor = connection.cursor()
    cursor.execute("SELECT u.id, u.first_name, u.last_name, u.email, u.username, coalesce(g.name, 'no tiene un grupo asignado') as grupo FROM auth_user u LEFT JOIN auth_user_groups ug ON ug.user_id = u.id LEFT JOIN auth_group g ON g.id = ug.group_id WHERE u.id = %s", [request.user.id])
    usuario = dictfetchall(cursor)
    return render(request, "solicitudes/index.html", {'solicitudes': solicitudes, 'procesos': procesos, 'usuario': usuario})

@login_required
def cerrarSesion(request):
    logout(request)
    return HttpResponseRedirect(reverse('inicio'))

@login_required
def workflowList(request):
    if request.method == 'POST':
        usuario = request.POST['usuario'];
        nombre = request.POST['nombre'];
        workflow = Flujo_de_trabajo(usuario_id = usuario, nombre = nombre, publicado = False)
        workflow.save()
        return HttpResponseRedirect(reverse('nuevoWorkflow'))  # Redirect after POST
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT f.id, u.first_name, u.last_name, f.nombre, f.publicado  FROM modelos_flujo_de_trabajo f INNER JOIN auth_user u ON u.id = f.usuario_id")
        procesos = dictfetchall(cursor)
    return render(request, "admin/workflowList/workflowList.html", {'procesos': procesos})

@login_required
def nuevoWorkflow(request):
    if request.method == 'POST':
        usuario = request.POST['usuario'];
        nombre = request.POST['nombre'];
        workflow = Flujo_de_trabajo(usuario_id = usuario, nombre = nombre, publicado = False)
        workflow.save()
        return HttpResponseRedirect(reverse('workflowList'))  # Redirect after POST
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT id, first_name, last_name FROM auth_user")
        usuarios = dictfetchall(cursor)
    return render(request, "admin/nuevoWorkflow/index.html", {'usuarios': usuarios})

@login_required
def verPasos(request, id):
    cursor = connection.cursor()
    cursor.execute("SELECT p.id, f.nombre as proceso, u.first_name, u.last_name, p.numero, p.nombre as paso, p.duracion FROM modelos_pasos p INNER JOIN modelos_flujo_de_trabajo f ON p.flujos_id = f.id INNER JOIN auth_user u ON u.id = p.usuario_id WHERE f.id = %s", [id])
    pasos = dictfetchall(cursor)
    cursor = connection.cursor()
    cursor.execute("SELECT id, nombre FROM modelos_flujo_de_trabajo WHERE id = %s", [id])
    proceso = dictfetchall(cursor)
    return render(request, "admin/pasos/index.html", {'pasos': pasos, 'proceso': proceso})

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
    
@login_required
def solicitudesAgentes(request):
    cursor = connection.cursor()
    cursor.execute("SELECT solicitudes.id, flujo.nombre FROM modelo_solicitudes solicitudes INNER JOIN modelo_flujo_de_trabajo flujo ON solicitudes.lujo_id = flujo.id" % (request.POST.get('solicitudes','')))
    solicitudes = cursor.fetchall()
    return render(request, "admin/solicitudes/agente.html", {'solicitud': solicitudes})

@login_required
def nuevoPaso(request, id):
    if request.method == 'POST':
        usuario = request.POST['usuario'];
        nombre = request.POST['nombre'];
        numero = request.POST['numero'];
        duracion = request.POST['duracion'];
        paso = Pasos(usuario_id = usuario, nombre = nombre, numero = numero, duracion = duracion, flujos_id = id)
        paso.save()
        return HttpResponseRedirect(reverse('verPasos', args=[id]))  # Redirect after POST
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT id, first_name, last_name FROM auth_user")
        usuarios = dictfetchall(cursor)
        cursor = connection.cursor()
        cursor.execute("SELECT id, nombre FROM modelos_flujo_de_trabajo WHERE id = %s", [id])
        proceso = dictfetchall(cursor)
    return render(request, "admin/pasos/nuevo/index.html", {'usuarios': usuarios, 'proceso': proceso})

@login_required
def eliminarPaso(request, idWorkflow, idPaso):
    paso = Pasos.objects.get(id=int(idPaso))
    paso.delete()
    return HttpResponseRedirect(reverse('verPasos', args=[idWorkflow]))

@login_required
def editarPaso(request, idWorkflow, idPaso):
    if request.method == 'POST':
        usuario = request.POST['usuario'];
        nombre = request.POST['nombre'];
        numero = request.POST['numero'];
        duracion = request.POST['duracion'];
        paso = Pasos.objects.get(id=int(idPaso))
        paso.usuario_id = usuario
        paso.nombre = nombre
        paso.numero = numero
        paso.duracion = duracion
        paso.flujos_id = idWorkflow
        paso.save()
        return HttpResponseRedirect(reverse('verPasos', args=[idWorkflow]))  # Redirect after POST
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT id, first_name, last_name FROM auth_user")
        usuarios = dictfetchall(cursor)
        cursor = connection.cursor()
        cursor.execute("SELECT id, nombre FROM modelos_flujo_de_trabajo WHERE id = %s", [idWorkflow])
        proceso = dictfetchall(cursor)
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM modelos_pasos WHERE id = %s", [idPaso])
        paso = dictfetchall(cursor)
    return render(request, "admin/pasos/editar/index.html", {'usuarios': usuarios, 'proceso': proceso, 'paso': paso})

@login_required
def verUsuarios(request):
    cursor = connection.cursor()
    cursor.execute("SELECT u.id, u.first_name, u.last_name, u.email, u.username, coalesce(g.name, 'no tiene un grupo asignado') as grupo FROM auth_user u LEFT JOIN auth_user_groups ug ON ug.user_id = u.id LEFT JOIN auth_group g ON g.id = ug.group_id")
    usuarios = dictfetchall(cursor)
    return render(request, "admin/usuarios/index.html", {'usuarios': usuarios})

@login_required
def nuevoUsuario(request):
    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        grupo_get = request.POST["grupo"]
        user = User.objects.create_user(username, email, password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        grupo = Group.objects.filter(name=str(grupo_get))
        user = User.objects.get(pk=user.id)
        if grupo.exists():
            user.groups.add(grupo[0])
        else:
            grupo = Group(name=grupo_get)
            grupo.save()
            user.groups.add(grupo)
        return HttpResponseRedirect(reverse('verUsuarios'))
    else:
        return render(request, "admin/usuarios/nuevo/index.html", {})

@login_required
def editarUsuario(request, idUsuario):
    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]
        grupo_get = request.POST["grupo"]
        user = User.objects.get(id=int(idUsuario))
        user.username = username
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        if password == '':
            print('no se actualiza la contrasena')
        else:
            user.set_password(password)
        user.save()
        user.groups.clear()
        grupo = Group.objects.filter(name=str(grupo_get))
        user = User.objects.get(pk=user.id)
        if grupo.exists():
            user.groups.add(grupo[0])
        else:
            grupo = Group(name=grupo_get)
            grupo.save()
            user.groups.add(grupo)
        return HttpResponseRedirect(reverse('verUsuarios'))
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT u.id, u.first_name, u.last_name, u.email, u.username, coalesce(g.name, 'no tiene un grupo asignado') as grupo FROM auth_user u LEFT JOIN auth_user_groups ug ON ug.user_id = u.id LEFT JOIN auth_group g ON g.id = ug.group_id WHERE u.id = %s", [idUsuario])
        usuario = dictfetchall(cursor)
        return render(request, "admin/usuarios/editar/index.html", {'usuario': usuario})

@login_required
def eliminarUsuario(request, idUsuario):
    usuario = User.objects.get(id=int(idUsuario))
    usuario.delete()
    return HttpResponseRedirect(reverse('verUsuarios'))

@login_required
def editarWorkflow(request, idWorkflow):
    if request.method == 'POST':
        userId = request.POST["usuario"]
        nombre = request.POST["nombre"]
        workflow = Flujo_de_trabajo.objects.get(id=int(idWorkflow))
        workflow.usuario_id = userId
        workflow.nombre = nombre
        workflow.save()
        return HttpResponseRedirect(reverse('workflowList'))
    else:
        cursor = connection.cursor()
        cursor.execute("SELECT f.id as procesoId, u.first_name, u.id as userId, u.last_name, f.nombre, f.publicado  FROM modelos_flujo_de_trabajo f INNER JOIN auth_user u ON u.id = f.usuario_id WHERE f.id = %s", [idWorkflow])
        workflow = dictfetchall(cursor)
        cursor = connection.cursor()
        cursor.execute("SELECT id, first_name, last_name FROM auth_user")
        usuarios = dictfetchall(cursor)
    return render(request, "admin/workflowList/editarWorkflow/index.html", {'usuarios': usuarios, 'workflow': workflow})

@login_required
def desactivarWorkflow(request, idWorkflow):
    workflow = Flujo_de_trabajo.objects.get(id=int(idWorkflow))
    workflow.publicado = False
    workflow.save()
    return HttpResponseRedirect(reverse('workflowList'))

@login_required
def activarWorkflow(request, idWorkflow):
    workflow = Flujo_de_trabajo.objects.get(id=int(idWorkflow))
    workflow.publicado = True
    workflow.save()
    return HttpResponseRedirect(reverse('workflowList'))

@login_required
def crearSolicitud(request, idProceso):
    solicitud = Solicitudes(flujos_id = int(idProceso), usuario_id = request.user.id, fecha = datetime.date.today(), respuesta = '')
    solicitud.save()
    return HttpResponseRedirect(reverse('formulario', args=[solicitud.id]))

@login_required
def formulario(request, idSolicitud):
    if Solicitudes_logs.objects.filter(solicitudes_id = int(idSolicitud)).exists():
        log = Solicitudes_logs.objects.filter(solicitudes_id = int(idSolicitud)).order_by('-id')[0]
        dataLog = serializers.serialize('json', [log,])
        if Pasos.objects.filter(id=int(log.pasos_id)).exists():
            paso = Pasos.objects.filter(id=int(log.pasos_id))[0]
            dataPaso = serializers.serialize('json', [paso, ])
        else:
            dataPaso = serializers.serialize('json', '')
    else:
        solicitud = Solicitudes.objects.get(id=int(idSolicitud))
        log_nuevo = Solicitudes_logs(pasos_id = 0, solicitudes_id = int(idSolicitud), usuario_id = request.user.id, fecha = datetime.date.today())
        log_nuevo.save()
        dataLog = serializers.serialize('json', [log_nuevo, ])
        dataPaso = serializers.serialize('json', '')
    return render(request, "solicitudes/formulario/index.html", {'log': dataLog, 'paso': dataPaso})

@login_required
def enviarFormulario(request, idLog):
    if request.method == 'POST':
        comentarios = request.POST['comentarios']
        log = Solicitudes_logs.objects.get(id=int(idLog))
        log.comentarios = comentarios
        log.save()
        if Pasos.objects.filter(id=int(log.pasos_id)).exists():
            paso_antiguo = Pasos.objects.get(id=int(log.pasos_id))
            paso_nuevo = Pasos.objects.filter(flujos_id=int(paso_antiguo.flujos_id), numero=int(paso_antiguo.numero+1))
        else:
            solicitud = Solicitudes.objects.get(id=int(log.solicitudes_id))
            paso_nuevo = Pasos.objects.filter(flujos_id=int(solicitud.flujos_id), numero=1)
        if paso_nuevo.exists():
            log_nuevo = Solicitudes_logs(pasos_id = int(paso_nuevo[0].id), solicitudes_id = int(log.solicitudes_id), usuario_id = int(paso_nuevo[0].usuario_id), fecha = datetime.date.today())
            log_nuevo.save()
        else:
            solicitud = Solicitudes.objects.get(id=int(log.solicitudes_id))
            solicitud.respuesta = comentarios
            solicitud.save()
    return HttpResponseRedirect(reverse('home'))

@login_required
def devolverFormulario(request, idLog):
    if request.method == 'POST':
        comentarios = request.POST['comentarios']
        log = Solicitudes_logs.objects.get(id=int(idLog))
        log.comentarios = comentarios
        log.save()
        paso_antiguo = Pasos.objects.get(id=int(log.pasos_id))
        paso_nuevo = Pasos.objects.filter(flujos_id=int(paso_antiguo.flujos_id), numero=int(paso_antiguo.numero-1))
        log_nuevo = Solicitudes_logs(pasos_id = int(paso_nuevo[0].id), solicitudes_id = int(log.solicitudes_id), usuario_id = int(paso_nuevo[0].usuario_id), fecha = datetime.date.today())
        log_nuevo.save()
    return HttpResponseRedirect(reverse('home'))