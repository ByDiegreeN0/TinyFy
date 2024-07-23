from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class user(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone_mnumber = models.IntegerField(default=0)
    
    username = None
    
    USERNAME_FIELD = 'email' # se define con que campo se va a usar como nombre de usuario
    REQUIRED_FIELDS = [] # aca se deficen los campos obligatorios para crear un usuario
    
    def __str__(self):
        return self.email
