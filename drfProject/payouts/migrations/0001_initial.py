# Generated by Django 5.0.6 on 2024-07-23 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='payouts',
            fields=[
                ('payout_id', models.AutoField(primary_key=True, serialize=False)),
                ('payout_date', models.DateTimeField()),
                ('payout_user_id', models.BigIntegerField()),
            ],
        ),
    ]