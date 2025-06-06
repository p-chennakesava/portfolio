from django.apps import AppConfig
from django.conf import settings
import os

class BackendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'backend'

    def ready(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        username = os.environ.get('DJANGO_ADMIN')
        password = os.environ.get('DJANGO_ADMIN_PASSWORD')
        email = 'admin@gmail.com'

        if username and password:
            if not User.objects.filter(username=username).exists():
                admin = User.objects.create_superuser(username=username, email=email, password=password)
                admin.is_staff = True
                admin.is_superuser = True
                admin.is_active = True
                admin.save()
