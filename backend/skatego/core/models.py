from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


User = get_user_model()

class SkakeBoardModel(models.Model):
    name = models.CharField(max_length=63, verbose_name='')
    max_speed_km_h = models.SmallIntegerField()
    battery_capacity_ah = models.SmallIntegerField()
    power_reverse_km = models.SmallIntegerField()

class SkateBoard(models.Model):
    model = models.ForeignKey(
        SkakeBoardModel,
        related_name='skateboards',
        on_delete=models.DO_NOTHING)
    max_battery_charge_ah = models.SmallIntegerField()
    current_battery_charge_ah = models.SmallIntegerField()

class SkateBoardLocation(models.Model):
    skateboard = models.ForeignKey(
        SkateBoard,
        related_name='location_history',
        on_delete=models.DO_NOTHING)
    location_lat = models.FloatField(
        validators=[
            MaxValueValidator(-90.0),
            MaxValueValidator(90.0)
        ],
        help_text='Широта (-90.0 до 90.0)'
    )
    location_lng = models.FloatField(
        validators=[
            MaxValueValidator(-180.0),
            MaxValueValidator(180.0)
        ],
        help_text='Широта (-180.0 до 180.0)'
    )
    location_last_update = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        verbose_name = 'Местоположение электроскейтборда'
        verbose_name_plural = 'Местоположение электроскейтбордов'
        ordering = ('-location_last_update',)
