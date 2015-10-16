# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='direction',
            field=models.ForeignKey(verbose_name='Direction', blank=True, to='authentication.Direction', null=True),
            preserve_default=True,
        ),
    ]
