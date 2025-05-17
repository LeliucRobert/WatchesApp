from django.core.management.base import BaseCommand
from api.models import Watch
from django.contrib.auth import get_user_model
from faker import Faker
import random

fake = Faker()
User = get_user_model()

WATCH_CATEGORIES = ["luxury", "vintage", "casual", "smartwatch"]
WATCH_CONDITIONS = ["new", "used"]

WATCH_PRICES = {
    "luxury": (3000, 15000),
    "vintage": (500, 5000),
    "casual": (100, 800),
    "smartwatch": (200, 2000),
}


class Command(BaseCommand):
    help = "Generate fake watches with random users as sellers"

    def add_arguments(self, parser):
        parser.add_argument("count", type=int, help="Number of watches to generate")

    def handle(self, *args, **kwargs):
        count = kwargs["count"]
        users = list(User.objects.all())

        if not users:
            self.stdout.write(self.style.ERROR(" No users found. Generate users first."))
            return

        watches = []

        for _ in range(count):
            category = random.choice(WATCH_CATEGORIES)
            min_price, max_price = WATCH_PRICES[category]
            watch = Watch(
                name=fake.company() + " " + fake.word().capitalize(),
                category=category,
                condition=random.choice(WATCH_CONDITIONS),
                description=fake.sentence(nb_words=10),
                price=random.randint(min_price, max_price),
                seller=random.choice(users),  #  Random user as seller
            )
            watches.append(watch)

        Watch.objects.bulk_create(watches, batch_size=1000)

        self.stdout.write(self.style.SUCCESS(f" Created {count} watches."))
