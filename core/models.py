from django.db import models

class Pasos(models.Model):
	id_pasos = models.IntegerField(blank = True, null = True)
    flujos_id = models.IntegerField(blank = True, null = True)
    usuario_id = models.IntegerField(blank = True, null = True)
    numero = models.IntegerField(blank = True, null = True)
    nombre = models.CharField(max_length=20, blank=True, null=True)
    duracion = models.IntegerField(blank = True, null = True)

    class Meta:
        managed = True
        db_table = 'Pasos'

    @classmethod
    def create(cls, categoria_p, tiempo_p, estado_p):
        categoria = cls(categoria = categoria_p, tiempo_de_vencimiento = tiempo_p, estado = estado_p)
        return categoria

class Flujo_de_trabajo(models.Model):
	id_flujo = models.IntegerField(blank = True, null = True)
    usuario_id = models.IntegerField(blank = True, null = True)
    nombre = models.CharField(max_length=20, blank=True, null=True)
    publicado = models.BooleanField(blank = True, null = True)

    class Meta:
        managed = True
        db_table = 'Flujo_de_trabajo'

    @classmethod
    def create(cls, categoria_p, tiempo_p, estado_p):
        categoria = cls(categoria = categoria_p, tiempo_de_vencimiento = tiempo_p, estado = estado_p)
        return categoria

class Solicitudes(models.Model):
	id_solicitudes = models.IntegerField(blank = True, null = True)
    flujos_id = models.IntegerField(blank = True, null = True)
    usuario_id = models.IntegerField(blank = True, null = True)
    fecha = models.DateField()
    """revisar si los parametros del TextField son correctos"""
    respuesta = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'Solicitudes'

    @classmethod
    def create(cls, categoria_p, tiempo_p, estado_p):
        categoria = cls(categoria = categoria_p, tiempo_de_vencimiento = tiempo_p, estado = estado_p)
        return categoria

class Solicitudes_logs(models.Model):
	id_solicitudes_logs = models.IntegerField(blank = True, null = True)
	pasos_id = models.IntegerField(blank = True, null = True)
    solicitudes_id = models.IntegerField(blank = True, null = True)
    usuario_id = models.IntegerField(blank = True, null = True)
    fecha = models.DateField()
    ruta_archivos = models.TextField(blank=True, null=True)
    """revisar si los parametros del TextField son correctos"""
    comentarios = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'Solicitudes_logs'

    @classmethod
    def create(cls, categoria_p, tiempo_p, estado_p):
        categoria = cls(categoria = categoria_p, tiempo_de_vencimiento = tiempo_p, estado = estado_p)
        return categoria