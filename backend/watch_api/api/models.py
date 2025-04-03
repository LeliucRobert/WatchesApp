from django.db import models

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