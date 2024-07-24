from django.db import models

# Create your models here.


class roles(models.Model): # CREACION DE LA TABLA DE ROLES
    role_data = models.CharField(max_length=100) # coloca el nombre del rol 
    created_at = models.DateTimeField() 
    updated_at = models.DateTimeField()
    
    class Meta:
        db_table = 'Roles' # NOMBRE DE LA TABLA EN LA BASE DE DATOS