from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Watch, WatchFile
from .serializers import WatchSerializer, WatchFileSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.settings import api_settings

import os

# GET all watches or POST (create new watch)

@api_view(['POST'])
def watch_create(request):
    print(request.data)
    serializer = WatchSerializer(data=request.data , context={'request': request})
    if serializer.is_valid():
        watch = serializer.save()
        files = request.FILES.getlist('media')

        for file in files:
            file_type = 'image' if 'image' in file.content_type else 'video'
            WatchFile.objects.create(watch=watch, file=file, file_type=file_type)

        return Response(WatchSerializer(watch , context={'request': request}).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def watch_list(request):
    # watches = Watch.objects.all().order_by('-created_at')
    watches = Watch.objects.all()

    search = request.GET.get('search')
    if search:
        watches = watches.filter(
            Q(name__icontains=search) |
            Q(description__icontains=search) |
            Q(seller__icontains=search)
        )

    category = request.GET.get('category')
    if category:
        watches = watches.filter(category=category)

    # --- 🧼 Condition filter ---
    condition = request.GET.get('condition')
    if condition:
        watches = watches.filter(condition=condition)

    # --- 💰 Price filters ---
    price = request.query_params.get("price")
    if price and "-" in price:
        try:
            min_price, max_price = map(float, price.split("-"))
            
            watches = watches.filter(price__gte=min_price)

            if max_price != 2e9:
                watches = watches.filter(price__lte=max_price)
        except ValueError:
                pass
    


    # --- 🔀 Sorting ---
    sort_by = request.GET.get('sort')  # e.g. "-price", "created_at"
    if sort_by == "price_asc":
        watches = watches.order_by("price")
    if sort_by == "price_desc":
        watches = watches.order_by("-price")
    if sort_by == "newest":
        watches = watches.order_by("-created_at")

    seller = request.GET.get('seller')
    if seller:
        watches = watches.filter(seller=seller)

    fetch_all = request.GET.get("all", "false").lower() == "true"
    if fetch_all:
        serializer = WatchSerializer(watches, many=True, context={'request': request})
        return Response({
            "count": watches.count(),
            "results": serializer.data
        })

    paginator = api_settings.DEFAULT_PAGINATION_CLASS()
    paginated_queryset = paginator.paginate_queryset(watches, request)
    serializer = WatchSerializer(paginated_queryset, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def watch_list_by_seller(request , seller_id):
    # watches = Watch.objects.all().order_by('-created_at')
    watches = Watch.objects.filter(seller__id=seller_id)
    
    serializer = WatchSerializer(watches, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['PATCH'])
def watch_update(request, pk):
    try:
        watch = Watch.objects.get(pk=pk)
    except Watch.DoesNotExist:
        return Response({'error': 'Watch not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = WatchSerializer(watch, data=request.data, context={'request': request})
    if serializer.is_valid():
        updated_watch = serializer.save()

        # Optional: delete previous media files if needed
        # updated_watch.media.all().delete()

        existing_ids = request.data.getlist('existing_media_ids')
        watch.media.exclude(id__in=existing_ids).delete()

        # Add new uploaded media files
        files = request.FILES.getlist('media')
        for file in files:
            file_type = 'image' if 'image' in file.content_type else 'video'
            WatchFile.objects.create(watch=updated_watch, file=file, file_type=file_type)

        return Response(WatchSerializer(updated_watch, context={'request': request}).data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_watch(request, pk):
    try:
        watch = Watch.objects.get(pk=pk)

        watch.delete()
        return Response({"message": "Watch deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Watch.DoesNotExist:
        return Response({"error": "Watch not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def ping(request):
    return Response({"message": "pong"}, status=200)

from .tasks import start_generator, stop_generator

@api_view(["POST"])
def api_start_generator(request):
    start_generator()
    return Response({"message": "Watch generator started"})

@api_view(["POST"])
def api_stop_generator(request):
    stop_generator()
    return Response({"message": "Watch generator stopped"})

# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync

# def broadcast_new_watch(watch_data):
#     channel_layer = get_channel_layer()
#     async_to_sync(channel_layer.group_send)(
#         "watches",
#         {
#             "type": "send_watch_update",
#             "data": watch_data
#         }
#     )
