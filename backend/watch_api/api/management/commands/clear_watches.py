from django.core.management.base import BaseCommand
from watch_api.models import Watch

class Command(BaseCommand):
    help = "Delete all watches"

    def handle(self, *args, **kwargs):
        count = Watch.objects.count()
        Watch.objects.all().delete()
        self.stdout.write(self.style.SUCCESS(f"✅ Deleted {count} watches."))
