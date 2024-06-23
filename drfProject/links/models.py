from django.db import models # MODULO POR DEFECTO PARA MODELOS DE DJANGO
from django.core.exceptions import ValidationError # MODULO PARA VALIDACIONES DE ERRORES 
import datetime # FUNCION DE PYTHON QUE GUARDA DATOS DE FECHAS

# Create your models here.

def validateYear(value): # FUNCION PARA VALIDAR EL AÑO EN LAS TABLAS
    
    current_year = datetime.datetime.now().year
    
    if value < 1900 or value > current_year:
        raise ValidationError(f"{value} is not a valid year. Year must be between 1900 and {current_year}.")
    



class linksTable(models.Model): # CREACION DE LA TABLA LINKS
    
    link_name = models.CharField(max_length=255)
    link_old_url = models.URLField(max_length=255)
    link_new_url = models.URLField(max_length=255) # ATRIBUTOS DE LA TABLA
    link_views = models.IntegerField()
    user_id = models.BigIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    

class monthlyViews(models.Model): # CREACION DE LA TABLA PARA VISTAS MENSUALES DE LOS LINKS
    
    link_id = models.ForeignKey(
            linksTable, on_delete=models.CASCADE
        )
    
    monthly_views = models.IntegerField()
    year = models.IntegerField()
    month = models.SmallIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    

class dailyViews(models.Model): # CREACION DE LA TABLA PARA VISTAS DIARIAS DE LOS LINKS
    
    link_id = models.ForeignKey(
            linksTable, on_delete=models.CASCADE
        )
    
    daily_views = models.IntegerField()
    date = models.DateField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    
    