# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Direction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200, verbose_name='Direction')),
            ],
            options={
                'verbose_name': 'Direction',
                'verbose_name_plural': 'Direction',
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='account',
            name='direction',
            field=models.ForeignKey(verbose_name='Direction', blank=True, to='authentication.Direction', null=True),
            preserve_default=True,
        ),
    ]
