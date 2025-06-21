from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.db import models

class User(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'username'
    KIND_CHOICES = (('C', 'common user'), ('S', 'staff'), ('A', 'superuser, admin'))
    objects = UserManager()
    is_active = True

    kind = models.CharField(max_length=1, choices=KIND_CHOICES, default='C')
    username = models.CharField(max_length=31, unique=True)

    @property
    def is_staff(self):
        return self.kind in 'SA'
    
    @property
    def is_superuser(self):
        return self.kind == 'A'
    
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