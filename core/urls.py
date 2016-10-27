from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.inicio, name='inicio'),
    url(r'^registro/$', views.registro, name='registro'),
    url(r'^solicitudes/$', views.home, name='home'),
    url(r'^cerrarSesion/$', views.cerrarSesion, name='cerrarSesion'),
    url(r'^administracion/usuarios/$', views.administrarUsuarios, name='administrarUsuarios'),
    url(r'^administracion/workflow/list/$', views.workflowList, name='workflowList'),
    url(r'^administracion/workflow/nuevo/$', views.nuevoWorkflow, name='nuevoWorkflow'),
    url(r'^administracion/solicitudes/agente/$', views.solicitudesAgentes, name='solicitudesAgente'),
    url(r'^administracion/workflow/(?P<id>\d+)/pasos/$', views.verPasos, name='verPasos'),
    url(r'^administracion/workflow/(?P<id>\d+)/pasos/nuevo$', views.nuevoPaso, name='nuevoPaso'),
    url(r'^administracion/workflow/(?P<id>\d+)/pasos/borrar$', views.eliminarPaso, name='eliminarPaso'),
]