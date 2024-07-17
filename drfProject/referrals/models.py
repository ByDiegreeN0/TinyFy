
from django.db import models
from django.contrib.auth.models import User

class Referral(models.Model):
    referrer_from = models.ForeignKey(User, related_name='referrals_given', on_delete=models.CASCADE) # crea una relacion de foreign key para el modelo de uesrs
    referrer_to = models.OneToOneField(User, related_name='referral_received', on_delete=models.CASCADE) # crea una relacion de foreign key para el modelo de uesrs
    created_at = models.DateTimeField(auto_now_add=True)




