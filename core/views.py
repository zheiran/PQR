# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render

def index(request):
  return render(request, "blank.html", {})

def login(request):
  return render(request, "login/login.html", {})