from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from core.models import Skateboard, SkateboardLocation

User = get_user_model()



class SkateboardRental(models.Model):
    """Аренда скейтборда."""
    STATUS_CHOICES = (
        ('active', 'Активна'),
        ('completed', 'Завершена'),
        ('cancelled', 'Отменена'),
    )
    user = models.ForeignKey(
        User,
        related_name='rental',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Пользователь'
    )
    skateboard = models.ForeignKey(
        Skateboard,
        related_name='rental',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Скейтборд'
    )
    start_time = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Время начала аренды'
    )
    end_time = models.DateTimeField(
        auto_now=True,
        null=True,
        verbose_name='Время завершения аренды'
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='active',
        verbose_name='Статус аренды'
    )
    total_cost = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        validators=[MinValueValidator(0.00), MaxValueValidator(15000.00)],
        null=True,
        verbose_name='Стоимость аренды'
    )
    start_location = models.ForeignKey(
        SkateboardLocation,
        on_delete=models.SET_NULL,
        null=True,
        related_name='rental_start',
        verbose_name='Начальная локация'
    )
    end_location = models.ForeignKey(
        SkateboardLocation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='rental_end',
        verbose_name='Конечная локация'
    )
    distanse_traveled_km = models.FloatField(
        validators=[
            MinValueValidator(0.0),
            MaxValueValidator(200.0)
        ],
        verbose_name='Длина поездки (km)'
    )
