from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Watch, WatchFile
from .serializers import WatchSerializer, WatchFileSerializer
from django.shortcuts import get_object_or_404

# GET all watches or POST (create new watch)

@api_view(['POST'])
def watch_create(request):
    print(request.data)
    serializer = WatchSerializer(data=request.data , context={'request': request})
    if serializer.is_valid():
        watch = serializer.save()
        print(request)
        print(1)
        files = request.FILES.getlist('media')

        for file in files:
            file_type = 'image' if 'image' in file.content_type else 'video'
            WatchFile.objects.create(watch=watch, file=file, file_type=file_type)

        return Response(WatchSerializer(watch , context={'request': request}).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def watch_list(request):
    watches = Watch.objects.all().order_by('-created_at')
    serializer = WatchSerializer(watches, many=True, context={'request': request})
    return Response(serializer.data)

# GET a single watch, PUT, PATCH, DELETE by id
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def watch_detail(request, pk):
    watch = get_object_or_404(Watch, pk=pk)

    if request.method == 'GET':
        serializer = WatchSerializer(watch)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WatchSerializer(watch, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        serializer = WatchSerializer(watch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        watch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
