# Generated by Django 5.2.2 on 2025-06-05 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(max_length=200)),
                ('message', models.TextField()),
                ('date_sent', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-date_sent'],
            },
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree', models.CharField(max_length=200)),
                ('institution', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('start_date', models.CharField(blank=True, max_length=200, null=True)),
                ('end_date', models.CharField(blank=True, max_length=200, null=True)),
                ('gpa', models.CharField(blank=True, max_length=10)),
                ('percentage', models.CharField(blank=True, max_length=10)),
                ('marks', models.CharField(blank=True, max_length=100)),
            ],
            options={
                'ordering': ['-end_date', '-start_date'],
            },
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(max_length=200)),
                ('company', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('current', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-end_date', '-start_date'],
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('experience', models.CharField(blank=True, max_length=100, null=True)),
                ('bio', models.TextField()),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('location', models.CharField(blank=True, max_length=100)),
                ('photo', models.ImageField(blank=True, upload_to='profile/')),
                ('logo', models.ImageField(blank=True, null=True, upload_to='profile/')),
                ('resume', models.FileField(blank=True, upload_to='resume/')),
                ('github', models.URLField(blank=True)),
                ('linkedin', models.URLField(blank=True)),
                ('twitter', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=100)),
                ('technologies', models.CharField(max_length=255)),
                ('image', models.ImageField(upload_to='projects/')),
                ('github_url', models.URLField(blank=True)),
                ('live_url', models.URLField(blank=True)),
                ('completion_date', models.DateField()),
                ('featured', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-completion_date'],
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('category', models.CharField(choices=[('frontend', 'Frontend'), ('backend', 'Backend'), ('database', 'Database'), ('devops', 'DevOps'), ('tools', 'Tools'), ('soft', 'Soft Skills'), ('other', 'Other')], max_length=50)),
                ('proficiency', models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)])),
                ('icon', models.CharField(blank=True, max_length=50)),
            ],
            options={
                'ordering': ['category', '-proficiency'],
            },
        ),
    ]
