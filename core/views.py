# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

def login(request):
  return render(request, "login/index.html", {})

def index(request):
  return render(request, "admin/usuarios/index.html", {})