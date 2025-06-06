# backend/signals.py

from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
from django.dispatch import receiver
import os

@receiver(post_migrate)
def create_admin_user(sender, **kwargs):
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
