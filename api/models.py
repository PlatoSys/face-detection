"""Models Module"""
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    """User Manager"""

    def create_user(self, email, firstname, password):
        """Create User"""
        user = self.model(
            email=self.normalize_email(email=email),
            firstname=firstname,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, firstname, password):
        """Create Superuser"""
        user = self.create_user(
            email=self.normalize_email(email=email),
            firstname=firstname,
            password=password
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    """User Model"""

    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    firstname = models.CharField(max_length=30, unique=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstname", "password"]

    objects = UserManager()

    def __str__(self) -> str:
        return self.email

    def has_perm(self, perms=None):
        return self.is_admin

    def has_module_perms(self, perms=None):
        return True


class DetectionImage(models.Model):
    """Detection Image Model"""

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    filename = models.CharField(max_length=200, blank=True)
    image = models.TextField(max_length=512, blank=True)
    processedImage = models.TextField(max_length=512, blank=True)
    originalPublicId = models.TextField(max_length=512, blank=True)
    processedPublicId = models.TextField(max_length=512, blank=True)
    isLive = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    landmarks = models.JSONField(default=dict)
    width = models.IntegerField()
    height = models.IntegerField()

    def __str__(self) -> str:
        return f'{self.filename}'
