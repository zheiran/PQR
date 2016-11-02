# Create your views here.
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.db import connection

from .forms import RegistroForm
from modelos.models import Flujo_de_trabajo, Pasos, Solicitudes

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

@login_required
def administrarUsuarios(request):
    if request.method == 'POST':  # If the form has been submitted...
        form = RegistroForm(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass
            # Process the data in form.cleaned_data
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            email = form.cleaned_data["email"]
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]
            # At this point, user is a User object that has already been saved
            # to the database. You can continue to change its attributes
            # if you want to change other fields.
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            # Save new user attributes
            user.save()
            return HttpResponseRedirect(reverse('administrarUsuarios'))  # Redirect after POST
        else:
            form = RegistroForm()
    return render(request, "admin/usuarios/index.html", {'form': form})

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
 
            # At this point, user is a User object that has already been saved
            # to the database. You can continue to change its attributes
            # if you want to change other fields.
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
 
            # Save new user attributes
            user.save()
 
            return HttpResponseRedirect(reverse('inicio'))  # Redirect after POST
    else:
        form = RegistroForm()

    return render(request, "login/registro.html", {'form': form})

@login_required
def home(request):
    return render(request, "solicitudes/index.html", {})

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