# Generated by Django 5.0.6 on 2024-07-23 07:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('links', '0003_alter_linkstable_user_id'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='linkstable',
            table='links_table',
        ),
    ]
