from django.db import models
from User.models import User

class payouts(models.Model):
    payout_id = models.AutoField(primary_key=True)
    payout_date = models.DateTimeField()
    payout_user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta: 
        db_table = 'payouts' # NOMBRE DE LA TABLA EN LA BASE DE DATOS