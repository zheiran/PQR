# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-10-20 04:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modelos', '0002_remove_pasos_id_pasos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Flujo_de_trabajo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario_id', models.IntegerField(blank=True, null=True)),
                ('nombre', models.CharField(blank=True, max_length=20, null=True)),
                ('publicado', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Solicitudes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flujos_id', models.IntegerField(blank=True, null=True)),
                ('usuario_id', models.IntegerField(blank=True, null=True)),
                ('fecha', models.DateField()),
                ('respuesta', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Solicitudes_logs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pasos_id', models.IntegerField(blank=True, null=True)),
                ('solicitudes_id', models.IntegerField(blank=True, null=True)),
                ('usuario_id', models.IntegerField(blank=True, null=True)),
                ('fecha', models.DateField()),
                ('ruta_archivos', models.TextField(blank=True, null=True)),
                ('comentarios', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
