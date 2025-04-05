from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Watch, WatchFile
from .serializers import WatchSerializer, WatchFileSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
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
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    if min_price:
        watches = watches.filter(price__gte=min_price)
    if max_price:
        watches = watches.filter(price__lte=max_price)

    # --- 🔀 Sorting ---
    sort_by = request.GET.get('sort_by')  # e.g. "-price", "created_at"
    if sort_by:
        watches = watches.order_by(sort_by)
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
