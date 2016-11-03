from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.inicio, name='inicio'),
    url(r'^registro/$', views.registro, name='registro'),
    url(r'^solicitudes/$', views.home, name='home'),
    url(r'^cerrarSesion/$', views.cerrarSesion, name='cerrarSesion'),
    url(r'^administracion/workflow/list/$', views.workflowList, name='workflowList'),
    url(r'^administracion/workflow/nuevo/$', views.nuevoWorkflow, name='nuevoWorkflow'),
    url(r'^administracion/workflow/editarWorkflow/(?P<idWorkflow>\d+)$', views.editarWorkflow, name='editarWorkflow'),
    url(r'^administracion/workflow/desactivarWorkflow/(?P<idWorkflow>\d+)$', views.desactivarWorkflow, name='desactivarWorkflow'),
    url(r'^administracion/workflow/activarWorkflow/(?P<idWorkflow>\d+)$', views.activarWorkflow, name='activarWorkflow'),
    url(r'^administracion/solicitudes/agente/$', views.solicitudesAgentes, name='solicitudesAgente'),
    url(r'^administracion/workflow/(?P<id>\d+)/pasos/$', views.verPasos, name='verPasos'),
    url(r'^administracion/workflow/(?P<id>\d+)/pasos/nuevo$', views.nuevoPaso, name='nuevoPaso'),
    url(r'^administracion/workflow/(?P<idWorkflow>\d+)/pasos/borrar/(?P<idPaso>\d+)$', views.eliminarPaso, name='eliminarPaso'),
    url(r'^administracion/workflow/(?P<idWorkflow>\d+)/pasos/editar/(?P<idPaso>\d+)$', views.editarPaso, name='editarPaso'),
    url(r'^administracion/usuarios/$', views.verUsuarios, name='verUsuarios'),
    url(r'^administracion/usuarios/nuevo/$', views.nuevoUsuario, name='nuevoUsuario'),
    url(r'^administracion/usuarios/editar/(?P<idUsuario>\d+)$', views.editarUsuario, name='editarUsuario'),
    url(r'^administracion/usuarios/borrar/(?P<idUsuario>\d+)$', views.eliminarUsuario, name='eliminarUsuario'),
]