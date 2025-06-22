from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from core.models import Skateboard

User = get_user_model()


class SkateboardReview(models.Model):
    """Отзыв о электроскейтборде"""
    user = models.ForeignKey(
        User,
        related_name='reviews',
        on_delete=models.SET_NULL,
        null=True,
        blanl=True,
        verbose_name='Пользователь'
    )
    skateboard = models.ForeignKey(
        Skateboard,
        related_name='reviews',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Электроскейтборд'
    )
    rating = models.FloatField(
        validators=[MinValueValidator(1.0), MaxValueValidator(5.0)],
        help_text='Рейтинг от 1.0 до 5.0',
        verbose_name='Рейтинг'
    )
    text = models.TextField(verbose_name='Текст отзыва')
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления'
    )

    class Meta:
        verbose_name = 'Отзыв о электроскейтборде'
        verbose_name_plural = 'Отзывы о электроскейтбордах'
        ordering = ['-created_at']
        # unique_together = ['user', 'skateboard']
        indexes = (
            models.Index(fields=('user', 'skateboard')),
        )

    def __str__(self) -> str:
        username = self.user.username if sel.user else 'Удаленный пользователь'
        skateboard = self.skateboard.serial_number if self.skateboard else 'Удаленный электроскейтборд'
        return f'Отзыв от {username} на {skateboard}'