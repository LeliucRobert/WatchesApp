import threading, time
import random
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Watch
from django.conf import settings

is_generating = False  
generator_thread = None

def generate():
    global is_generating
    while is_generating:
        time.sleep(getattr(settings, "WATCH_GENERATOR_INTERVAL", 20))
        print("thread working")
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

def start_generator():
    global is_generating, generator_thread
    if not is_generating:
        is_generating = True
        generator_thread = threading.Thread(target=generate, daemon=True)
        generator_thread.start()

def stop_generator():
    global is_generating
    is_generating = False