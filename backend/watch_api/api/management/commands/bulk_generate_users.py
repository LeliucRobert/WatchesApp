from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from faker import Faker
import random

User = get_user_model()
fake = Faker()

class Command(BaseCommand):
    help = "Generate fake users"

    def add_arguments(self, parser):
        parser.add_argument("count", type=int, help="Number of users to create")

    def handle(self, *args, **kwargs):
        count = kwargs["count"]
        users = []

        for _ in range(count):
            username = fake.unique.user_name()
            email = fake.unique.email()
            password = "password123"  # Optional: You can hash it

            users.append(User(username=username, email=email))
            users[-1].set_password(password)  # Set password properly

        User.objects.bulk_create(users, batch_size=1000)

        self.stdout.write(self.style.SUCCESS(f"✅ Created {count} users."))
