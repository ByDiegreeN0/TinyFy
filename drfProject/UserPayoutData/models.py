from django.db import models
from django.contrib.auth.models import User  # Importa el modelo de usuario por defecto de Django
from django.conf import settings # importa las configuraciones de django


class UserPayoutData(models.Model):
    id = models.AutoField(primary_key=True)                                                   c          m.,                                                                                                                                                                                                                                                                                                                                                     c                        ,  n                                                                                                                                                                                                                                                                        
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payoutdata_username = models.CharField(max_length=255)
    payoutdata_email = models.EmailField()
    payoutdata_address1 = models.CharField(max_length=255)
    payoutdata_address2 = models.CharField(max_length=255, blank=True)
    payoutdata_country = models.CharField(max_length=255)
    payoutdata_zipcode = models.CharField(max_length=255)
    payoutdata_city = models.CharField(max_length=255)

    class Meta:
        db_table = 'user_payoutdata' 

    def __str__(self):
        return f'{self.user.username} - {self.payoutdata_username}'
