# Create your views here.
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.template.context import RequestContext

from .forms import RegistroForm

def login(request):
  	return render(request, "login/index.html", {})

def index(request):
  	return render(request, "admin/usuarios/index.html", {})

def registro(request):
    if request.method == 'POST':  # If the form has been submitted...
        form = RegistroForm(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass
 
            # Process the data in form.cleaned_data
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            email = form.cleaned_data["email"]
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]
 
            # At this point, user is a User object that has already been saved
            # to the database. You can continue to change its attributes
            # if you want to change other fields.
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
 
            # Save new user attributes
            user.save()
 
            return HttpResponseRedirect(reverse('login'))  # Redirect after POST
    else:
        form = RegistroForm()

    return render(request, "login/registro.html", {'form': form})