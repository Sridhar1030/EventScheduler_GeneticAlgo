# Generated by Django 4.2.9 on 2024-03-31 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0015_subevent_space_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='registeredevent',
            name='space_number',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
