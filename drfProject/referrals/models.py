from django.db import models

# Create your models here.


class user_referrals(models.Model):
    user_id = models.ForeignKey('users.User', on_delete=models.CASCADE)
    referral_id = models.ForeignKey('referrals', on_delete=models.CASCADE)


class referrals(models.Model):
    # no se q mas hacer aca jaja
    referral_created_at = models.DateField()
