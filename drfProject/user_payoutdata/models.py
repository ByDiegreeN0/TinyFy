from django.db import models

class user_payoutdata(models.Model): # se crea la tabla user_payoutdata
    user_payoutdata_id = models.AutoField(primary_key=True)
    user_id = models.BigIntegerField() # llave foranea para el usuario
    payoutdata_username = models.CharField(max_length=255)
    payoutdata_email = models.EmailField()
    payoudata_address1 = models.CharField(max_length=255)
    payoudata_address1_address2 = models.CharField(max_length=255, blank=True)
    payoutdata_country = models.CharField(max_length=255)
    payoutdata_zipcode = models.CharField(max_length=255)
    payoutdata_city = models.CharField(max_length=255)