# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-16 23:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20171210_1733'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='comment',
            field=models.CharField(max_length=4096, null=True),
        ),
        migrations.AlterField(
            model_name='answer',
            name='points',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='scheduledtestresult',
            name='comment',
            field=models.CharField(max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='scheduledtestresult',
            name='reviewer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='scheduled_test_results', to='api.AppUser'),
        ),
    ]
