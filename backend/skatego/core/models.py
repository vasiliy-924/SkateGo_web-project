from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


User = get_user_model()


class SkateboardModel(models.Model):
    """Модель электроскейтборда (тип/модель)"""
    name = models.CharField(max_length=100, verbose_name='Название модели')
    description = models.TextField(verbose_name='Описание модели')
    max_speed_km_h = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(200)],
        verbose_name='Максимальная скорость (km/h)'
    )
    battery_capacity_from_factory_ah = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(120.0)],
        verbose_name='Емкость батареи (Ah)'
    )
    max_battery_voltage_v = models.FloatField(
        validators=[MinValueValidator(1.0), MaxValueValidator(120.0)],
        verbose_name='Верхний предел напряжения батареи (V)'
    )
    min_battery_voltage_v = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(120.0)],
        verbose_name='Нижний предел напряжения батареи (V)'
    )
    power_reverse_km = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(200)],
        verbose_name='Запас хода (km)'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Модель электроскейтборда'
        verbose_name_plural = 'Модели электроскейтбордов'
        ordering = ('name',)

    def __str__(self) -> str:
        return self.name
    
    @property
    def max_capacity_wh(self) -> float:
        """Максимальный энергозапас батареи в Wh."""
        return self.battery_capacity_from_factory_ah * self.max_battery_voltage_v

class Skateboard(models.Model):
    """Конкретный экземпляр электроскейтборда."""
    STATUS_CHOICES = (
        ('available', 'Доступен'),
        ('rented', 'Арендован'),
        ('maintenance', 'На обслуживании'),
        ('charging', 'На зарядке'),
        ('broken', 'Сломан'),
        ('offline', 'Недоступен')
    )
    
    model = models.ForeignKey(
        SkateboardModel,
        related_name='skateboards',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Модель')
    serial_number = models.CharField(
        max_length=50,
        unique=True,
        verbose_name='Серийный номер'
    )
    current_battery_capacity_ah = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(120.0)],
        verbose_name='Емкость батареи с учетом деградации (Ah)'
    )
    current_battery_voltage_v = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(120.0)],
        verbose_name='Текущее напряжение в батарее (V)'
    )
    total_distance_km = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0)],
        verbose_name='Общий пробег текущего электроскейтбора (km)'
    )
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='available',
        verbose_name='Статус'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.model.name} - {self.serial_number}'
    
    def save(self, *args, **kwargs):
        if not self.current_battery_capacity_ah:
            self.current_battery_capacity_ah = self.model.battery_capacity_from_factory_ah
        if not self.current_battery_voltage_v:
            self.current_battery_voltage_v = (self.model.max_battery_voltage_v + self.model.min_battery_voltage_v) / 2
        super().save(*args, **kwargs)

    @property
    def battery_capacity_max_now_prcnt(self) -> float:
        """Процент остаточной макс. ёмкости от заводской (%)."""
        initial_ah = self.model.battery_capacity_from_factory_ah
        current_ah = self.current_battery_capacity_ah

        if initial_ah:
            return (current_ah / initial_ah) * 100
        return 0.0

    @property
    def power_reserve_now_km(self) -> float:
        """Максимальная дальность поездки эл.скейта с учетом остатка заряда."""
        initial_km = self.model.power_reverse_km
        current_voltage_prcnt = (self.current_battery_voltage_v - self.model.min_battery_voltage_v)/(self.model.max_battery_voltage_v - self.model.min_battery_voltage_v) * 100

        if self.current_battery_voltage_v > self.model.min_battery_voltage_v:
            return initial_km * self.battery_capacity_max_now_prcnt * current_voltage_prcnt 
        return 0.0
        

class SkateboardLocation(models.Model):
    skateboard = models.ForeignKey(
        Skateboard,
        related_name='location_history',
        on_delete=models.SET_NULL,
        null=True
    )
    location_lat = models.FloatField(
        validators=[
            MinValueValidator(-90.0),
            MaxValueValidator(90.0)
        ],
        help_text='Широта (-90.0 до 90.0)'
    )
    location_lng = models.FloatField(
        validators=[
            MinValueValidator(-180.0),
            MaxValueValidator(180.0)
        ],
        help_text='Долгота (-180.0 до 180.0)'
    )
    location_last_update = models.DateTimeField(
        auto_now=True,
        verbose_name='Время обновления'
        )

    class Meta:
        abstract = True
        verbose_name = 'Местоположение электроскейтборда'
        verbose_name_plural = 'Местоположение электроскейтбордов'
        ordering = ('-location_last_update',)
