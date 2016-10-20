from __future__ import unicode_literals

from django.db import models

class Pasos(models.Model):
    flujos_id = models.IntegerField(blank = True, null = True)
    usuario_id = models.IntegerField(blank = True, null = True)
    numero = models.IntegerField(blank = True, null = True)
    nombre = models.CharField(max_length = 50, blank = True, null = True)
    duracion = models.IntegerField(blank = True, null = True)

class Flujo_de_trabajo(models.Model):
    usuario_id = models.IntegerField(blank = True, null = True)
    nombre = models.CharField(max_length = 20, blank = True, null = True)
    publicado = models.BooleanField()

class Solicitudes(models.Model):
    flujos_id = models.IntegerField(blank = True, null = True)
    usuario_id = models.IntegerField(blank = True, null = True)
    fecha = models.DateField()
    respuesta = models.TextField(blank = True, null = True)

class Solicitudes_logs(models.Model):
	pasos_id = models.IntegerField(blank = True, null = True)
	solicitudes_id = models.IntegerField(blank = True, null = True)
	usuario_id = models.IntegerField(blank = True, null = True)
	fecha = models.DateField()
	ruta_archivos = models.TextField(blank = True, null = True)
	comentarios = models.TextField(blank = True, null = True)