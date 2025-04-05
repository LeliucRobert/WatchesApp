from django.db import models
import os
from django.db.models.signals import post_delete
from django.dispatch import receiver

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
    seller = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category})"

class WatchFile(models.Model):
    watch = models.ForeignKey(Watch, related_name="media", on_delete=models.CASCADE)
    file = models.FileField(upload_to='watch_media/')
    file_type = models.CharField(max_length=10, choices=[('image', 'Image'), ('video', 'Video')])

    def __str__(self):
        return f"{self.watch.name} - {self.file_type}"


@receiver(post_delete, sender=WatchFile)
def delete_watch_file_from_disk(sender, instance, **kwargs):
    if instance.file:
        file_path = instance.file.path
        if os.path.isfile(file_path):
            os.remove(file_path)
