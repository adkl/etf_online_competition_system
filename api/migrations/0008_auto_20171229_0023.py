# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-28 23:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20171216_2349'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheduledtest',
            name='duration',
            field=models.FloatField(verbose_name='Duration (in hours)'),
        ),
    ]
