# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_auto_20151026_1214'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='tagline',
        ),
        migrations.AddField(
            model_name='account',
            name='address',
            field=models.CharField(max_length=200, null=True, verbose_name='Address', blank=True),
            preserve_default=True,
        ),
    ]
