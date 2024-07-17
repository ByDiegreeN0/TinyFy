from django.db import models

# Create your models here.


class roles(models.Model): # CREACION DE LA TABLA DE ROLES
    # TODAVIA SE LE TIENE QUE AÑADIR LA FOREIGN KEY PARA USUARIOS
    role_data = models.CharField(max_length=100) # coloca el nombre del rol 
    created_at = models.DateTimeField() 
    updated_at = models.DateTimeField()