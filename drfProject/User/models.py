from django.db import models
from django.contrib.auth.models import AbstractUser

# Importa el modelo UserConfig aquí si existe

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.IntegerField(default=0)  
    user_config = models.OneToOneField('UserConfig', null=True, on_delete=models.SET_NULL)  # Corregido on_delete
    
    username = None
    
    USERNAME_FIELD = 'email'  # Campo a usar como nombre de usuario
    REQUIRED_FIELDS = []  # Campos requeridos para crear un usuario
    
    def __str__(self):
        return self.email
    
    class Meta:
        db_table = 'user'  # Nombre de la tabla en la base de datos


class UserConfig(models.Model):
    user_id = models.ForeignKey('user', on_delete=models.CASCADE)
    Two_factor_authentication = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'UserConfig' # NOMBRE DE LA TABLA EN LA BASE DE DATOS