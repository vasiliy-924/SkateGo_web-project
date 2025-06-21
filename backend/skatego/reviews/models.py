from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from core.models import SkateBoard

User = get_user_model()

class SkateboardReview(models.Model):
    user =  models.ForeignKey(
        User,
        related_name='reviews',
        on_delete=models.DO_NOTHING)
    skateboard = models.ForeignKey(
        SkateBoard,
        related_name='reviews',
        on_delete=models.DO_NOTHING)
    rating = models.FloatField(
        validators=[
            MinValueValidator(1.0),
            MaxValueValidator(5.0)
        ],
        help_text='Оценка от 1.0 до 5.0'
    )
    text = models.TextField()