from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.db import models

class User(AbstractBaseUser, PermissionsMixin):
    """Пользователь системы"""
    KIND_CHOICES = [
        ('C', 'Обычный пользователь'),
        ('S', 'Сотрудник'),
        ('A', 'Администратор')
    ]
    
    username = models.CharField(
        max_length=31, 
        unique=True,
        verbose_name='Имя пользователя'
    )
    email = models.EmailField(
        blank=True,
        verbose_name='Email'
    )
    first_name = models.CharField(
        max_length=30,
        blank=True,
        verbose_name='Имя'
    )
    last_name = models.CharField(
        max_length=30,
        blank=True,
        verbose_name='Фамилия'
    )
    phone = models.CharField(
        max_length=15,
        blank=True,
        verbose_name='Телефон'
    )
    kind = models.CharField(
        max_length=1,
        choices=KIND_CHOICES,
        default='C',
        verbose_name='Тип пользователя'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Активен'
    )
    date_joined = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата регистрации'
    )
    
    objects = UserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['username']

    def __str__(self) -> str:
        return self.username

    @property
    def is_staff(self) -> bool:
        return self.kind in ['S', 'A']
    
    @property
    def is_superuser(self) -> bool:
        return self.kind == 'A'
    
    def get_full_name(self) -> str:
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    def get_short_name(self) -> str:
        return self.first_name or self.username

    def __init__(self, *args, **kwargs):
        kwargs.pop('email', None)
        kind = None
        if kwargs.pop('is_staff', False):
            kind = 'S'
        if kwargs.pop('is_superuser', False):
            kind = 'A'
        if kind:
            kwargs['kind'] = kind
        super().__init__(*args, **kwargs)