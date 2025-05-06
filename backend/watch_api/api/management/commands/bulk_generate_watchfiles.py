from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
import random
from api.models import WatchFile, Watch

class Command(BaseCommand):
    help = 'Bulk-create WatchFile objects for all watches, reusing existing images, with progress display.'

    def handle(self, *args, **options):
        media_folder = os.path.join(settings.MEDIA_ROOT, 'watch_media')

        available_files = [
            f for f in os.listdir(media_folder)
            if f.endswith(('.jpeg', '.jpg', '.png'))
        ]

        if not available_files:
            self.stdout.write(self.style.ERROR("❌ No image files found in watch_media/."))
            return

        watches = Watch.objects.all()
        if not watches.exists():
            self.stdout.write(self.style.ERROR("❌ No Watch objects found."))
            return

        self.stdout.write(self.style.WARNING(f"📦 Preparing WatchFiles for {watches.count()} watches..."))

        watchfiles = []
        total = watches.count()

        for index, watch in enumerate(watches, start=1):
            if watch.media.exists():  # Optional: skip if already has media
                continue

            filename = random.choice(available_files)
            watchfiles.append(
                WatchFile(
                    watch=watch,
                    file=f'watch_media/{filename}',
                    file_type='image'
                )
            )

            # Print progress
            if index % 1000 == 0 or index == total:
                self.stdout.write(f"✅ Processed {index}/{total} watches")

        WatchFile.objects.bulk_create(watchfiles, batch_size=1000)
        self.stdout.write(self.style.SUCCESS(f"✅ Successfully created {len(watchfiles)} WatchFile objects."))