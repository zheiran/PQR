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
]