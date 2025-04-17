import threading, time
import random
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Watch , WatchFile
from django.conf import settings

is_generating = False  
generator_thread = None
def generate():
    global is_generating
    while is_generating:
        time.sleep(getattr(settings, "WATCH_GENERATOR_INTERVAL", 10))

        # Pick a predefined watch
        watch_data = random.choice(WATCH_POOL)

        name = watch_data["name"]
        category = watch_data["category"]
        media_index = watch_data["media_index"]

        min_price, max_price = WATCH_PRICES[category]
        price = random.randint(min_price, max_price)

        condition = random.choice(WATCH_CONDITIONS)
        description = random.choice(WATCH_DESCRIPTIONS)
        seller = random.choice(WATCH_SELLERS)

        print(f"🛠 Generating: {name} [{category}]")

        new_watch = Watch.objects.create(
            name=name,
            category=category,
            condition=condition,
            description=description,
            price=price,
            seller=seller,
        )

        media_files = [
            f"watch_media/{media_index}_1.jpg",
            f"watch_media/{media_index}_2.jpg"
        ]

        media_objs = []
        for file_path in media_files:
            media = WatchFile.objects.create(
                watch=new_watch,
                file=file_path,
                file_type="image"
            )
            media_objs.append({
                "id": media.id,
                "file": file_path,
                "file_type": "image"
            })

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
                    "media": media_objs,
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

WATCH_POOL = [
    {
        "name": "Tissot Le Locle",
        "category": "luxury",
        "media_index": 1,
    },
    {
        "name": "Rolex Submariner",
        "category": "luxury",
        "media_index": 3,
    },
    {
        "name": "Omega Speedmaster",
        "category": "luxury",
        "media_index": 4,
    },
    {
        "name": "Tag Heuer Carrera",
        "category": "luxury",
        "media_index": 5,
    },
    {
        "name": "Seiko Presage",
        "category": "vintage",
        "media_index": 6,
    },
    {
        "name": "Casio G-Shock",
        "category": "casual",
        "media_index": 7,
    },
    {
        "name": "Hamilton Khaki Field",
        "category": "vintage",
        "media_index": 8,
    },
    {
        "name": "Apple Watch Ultra",
        "category": "smartwatch",
        "media_index": 9,
    },
    {
        "name": "Fossil Gen 6",
        "category": "smartwatch",
        "media_index": 10,
    },
    {
        "name": "Citizen Eco-Drive",
        "category": "casual",
        "media_index": 11,
    },
    {
        "name": "Longines HydroConquest",
        "category": "luxury",
        "media_index": 12,
    },
    {
        "name": "Garmin Fenix 7",
        "category": "smartwatch",
        "media_index": 13,
    },
]


WATCH_CATEGORIES = ["luxury", "vintage", "casual", "smartwatch"]
WATCH_CONDITIONS = ["new", "used"]
WATCH_SELLERS = ["WatchWorld", "AutoGen", "TimeKeepers", "The Vintage Shop", "WristMaster"]

WATCH_DESCRIPTIONS = [
    "A luxury timepiece designed for timeless elegance.",
    "Highly durable and built for extreme adventures.",
    "Perfect for collectors and enthusiasts alike.",
    "A smartwatch that blends design and performance.",
    "Rare vintage model in excellent condition.",
    "Affordable yet stylish for everyday use.",
    "Iconic watch reimagined with modern features."
]

WATCH_PRICES = {
    "luxury": (3000, 15000),
    "vintage": (500, 5000),
    "casual": (100, 800),
    "smartwatch": (200, 2000),
}
