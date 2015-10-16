# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_auto_20151016_0052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='direction',
            field=models.ForeignKey(default=1, verbose_name='Direction', to='authentication.Direction'),
            preserve_default=True,
        ),
    ]
