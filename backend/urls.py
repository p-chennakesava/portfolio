from django.urls import path
from .views import (
    ProfileListView, EducationListView, SkillListView,
    ProjectListView, ExperienceListView, ContactCreateView
)

urlpatterns = [
    path('profile/', ProfileListView.as_view(), name='profile-list'),
    path('education/', EducationListView.as_view(), name='education-list'),
    path('skills/', SkillListView.as_view(), name='skill-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('experience/', ExperienceListView.as_view(), name='experience-list'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
]
