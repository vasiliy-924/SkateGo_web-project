from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from core.models import Skateboard

User = get_user_model()

class SkateboardReview(models.Model):
    user =  models.ForeignKey(
        User,
        related_name='reviews',
        on_delete=models.SET_NULL,
        null=True
    )
    skateboard = models.ForeignKey(
        Skateboard,
        related_name='reviews',
        on_delete=models.SET_NULL,
        null=True
    )
    rating = models.FloatField(
        validators=[
            MinValueValidator(1.0),
            MaxValueValidator(5.0)
        ],
        help_text='Оценка от 1.0 до 5.0'
    )
    text = models.TextField()