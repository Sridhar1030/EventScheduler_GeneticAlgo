# Generated by Django 4.2.9 on 2024-02-10 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_alter_event_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='customusermodel',
            name='username',
            field=models.CharField(default='default_user', max_length=150, unique=True),
            preserve_default=False,
        ),
    ]
