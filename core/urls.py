from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.inicio, name='inicio'),
    url(r'^bandejaDeEntrada/$', views.index, name='index'),
    url(r'^registro/$', views.registro, name='registro'),
    url(r'^solicitudes/$', views.home, name='home'),
    url(r'^cerrarSesion/$', views.cerrarSesion, name='cerrarSesion'),
    url(r'^workflowList/$', views.workflowList, name='workflowList'),
]