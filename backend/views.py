from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Profile, Education, Skill, Project, Experience, Contact
from .serializers import (
    ProfileSerializer, EducationSerializer, SkillSerializer,
    ProjectSerializer, ExperienceSerializer, ContactSerializer
)

import os
from django.contrib.auth.models import User

class ProfileListView(generics.ListAPIView):

    username = os.environ.get('DJANGO_ADMIN')
    password = os.environ.get('DJANGO_ADMIN_PASSWORD')
    email = 'admin@gmail.com'

    if not User.objects.filter(username=username).exists():
        admin = User.objects.create_superuser(username=username, email=email, password=password)
        admin.is_staff = True
        admin.is_superuser = True
        admin.is_active = True
        admin.save()

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class ContactCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        contact = serializer.save()
        # Compose email content
        subject = contact.subject
        message = f"From: {contact.name} <{contact.email}>\n\n{contact.message}"
        recipient_list = [os.environ.get('DJANGO_EMAIL_HOST_USER')]  # Your receiving email

        send_mail(
            subject,
            message,
            contact.email,  # from email (user's email)
            recipient_list,
            fail_silently=False,
        )



    
        
