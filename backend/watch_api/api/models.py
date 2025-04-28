from django.db import models
import os
from django.db.models.signals import post_delete , post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

class Watch(models.Model):
    CONDITION_CHOICES = [
        ("new", "New"),
        ("used", "Used"),
    ]

    CATEGORY_CHOICES = [
        ("luxury", "Luxury"),
        ("vintage", "Vintage"),
        ("casual", "Casual"),
        ("smartwatch", "SmartWatch"),

    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="watches")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category})"

class WatchFile(models.Model):
    watch = models.ForeignKey(Watch, related_name="media", on_delete=models.CASCADE)
    file = models.FileField(upload_to='watch_media/')
    file_type = models.CharField(max_length=10, choices=[('image', 'Image'), ('video', 'Video')])

    def __str__(self):
        return f"{self.watch.name} - {self.file_type}"

class Profile(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

    def __str__(self):
        return f"{self.user.username} ({self.role})"

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

@receiver(post_delete, sender=WatchFile)
def delete_watch_file_from_disk(sender, instance, **kwargs):
    if instance.file:
        file_path = instance.file.path
        if os.path.isfile(file_path):
            os.remove(file_path)
