from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage
from backend.raw_storage import RawMediaCloudinaryStorage


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    experience = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField()
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    photo = models.ImageField(upload_to='profile/', storage=MediaCloudinaryStorage(), blank=True)
    logo = models.ImageField(upload_to='profile/', storage=MediaCloudinaryStorage(), blank=True, null=True)
    resume = models.FileField(upload_to='resume/', storage=RawMediaCloudinaryStorage(), blank=True, null=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Education(models.Model):
    degree = models.CharField(max_length=200)
    institution = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    start_date = models.CharField(max_length=200,blank=True, null=True)
    end_date = models.CharField(max_length=200,blank=True, null=True)
    gpa = models.CharField(max_length=10, blank=True)
    percentage = models.CharField(max_length=10, blank=True)
    marks = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['-end_date', '-start_date']

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('devops', 'DevOps'),
        ('tools', 'Tools'),
        ('soft', 'Soft Skills'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 scale
    icon = models.CharField(max_length=50, blank=True)  # For frontend icon name

    class Meta:
        ordering = ['category', '-proficiency']

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    technologies = models.CharField(max_length=255)
    image = models.ImageField(upload_to='projects/', storage=MediaCloudinaryStorage(), blank=True, null=True)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    completion_date = models.CharField(max_length=100 ,blank=True, null=True)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-completion_date']

    def __str__(self):
        return self.title

class Experience(models.Model):
    position = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.CharField(max_length=100 ,blank=True, null=True)
    end_date = models.CharField(max_length=100 ,blank=True, null=True)
    current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-end_date', '-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_sent']

    def __str__(self):
        return f"{self.name} - {self.subject}"
