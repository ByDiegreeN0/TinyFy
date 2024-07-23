from django.db import models
from django.contrib.auth.models import User  # Importa el modelo de usuario por defecto de Django

class UserPayoutData(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Relación con el modelo de usuario
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
