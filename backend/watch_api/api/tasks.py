import threading, time
import random
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Watch
from django.conf import settings

def start_watch_generator():
    def generate():
        while True:
            time.sleep(getattr(settings, "WATCH_GENERATOR_INTERVAL", 20))
            print(1)
            new_watch = Watch.objects.create(
                name=f"Auto Watch {random.randint(1000,9999)}",
                category="luxury",
                condition="new",
                description="Generated watch",
                price=random.randint(100, 5000),
                seller="AutoGen",
            )
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "watches",
                {
                    "type": "send_watch",
                    "data": {
                        "id": new_watch.id,
                        "name": new_watch.name,
                        "price": new_watch.price,
                        "category": new_watch.category,
                        "condition": new_watch.condition,
                        "description": new_watch.description,
                        "seller": new_watch.seller,
                        "media": [],
                    },
                },
            )

    threading.Thread(target=generate, daemon=True).start()
