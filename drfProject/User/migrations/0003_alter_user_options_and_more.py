# Generated by Django 5.0.6 on 2024-07-24 18:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_user_phone_mnumber'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={},
        ),
        migrations.RenameField(
            model_name='user',
            old_name='phone_mnumber',
            new_name='phone_number',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user',
        ),
        migrations.CreateModel(
            name='UserConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Two_factor_authentication', models.BooleanField(default=False)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserConfig',
            },
        ),
        migrations.AddField(
            model_name='user',
            name='user_config',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='User.userconfig'),
        ),
    ]