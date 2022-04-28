"""Main App for API"""
from django.apps import AppConfig


class ApiConfig(AppConfig):
    """API Config"""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
