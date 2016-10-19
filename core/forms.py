from django import forms
from django.contrib.auth.models import User
from django.forms import ModelForm
 
 
class RegistroForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']
        widgets = {
            'username': 	forms.TextInput(attrs={'class': 'form-control'}),
            'password': 	forms.PasswordInput(attrs={'class': 'form-control'}),
            'email': 		forms.TextInput(attrs={'class': 'form-control'}),
            'first_name': 	forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': 	forms.TextInput(attrs={'class': 'form-control'}),
        }
		