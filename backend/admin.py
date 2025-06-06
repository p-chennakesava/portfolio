from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Profile, Education, Skill, Project, Experience, Contact

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category',)
    search_fields = ('name', 'category')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'completion_date')
    list_filter = ('category', 'completion_date')
    search_fields = ('title', 'description')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')
    search_fields = ('position', 'company', 'description')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'date_sent')
    list_filter = ('date_sent',)
    search_fields = ('name', 'email', 'subject', 'message')
