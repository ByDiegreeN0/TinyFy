# Generated by Django 5.0.6 on 2024-07-24 18:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Links',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link_name', models.CharField(max_length=255)),
                ('link_old_url', models.URLField(max_length=255)),
                ('link_new_url', models.URLField(max_length=255)),
                ('link_views', models.IntegerField()),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'links_table',
            },
        ),
    ]
