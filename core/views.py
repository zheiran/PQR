# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

def index(request):
  return render(request, "base.html", {})