from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Watch
from .serializers import WatchSerializer


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def watch(request , pk=None):
    """"
    "Watch API view to handle GET and POST requests."
    """

    if request.method == 'GET':
        if pk:
            try:
                watch = Watch.objects.get(pk=pk)
                serializer = WatchSerializer(watch)
                return Response(serializer.data)
            except Watch.DoesNotExist:
                return Response({'error': 'Watch not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            watches = Watch.objects.all()
            serializer = WatchSerializer(watches, many=True)
            return Response(serializer.data)

    elif request.method == 'POST':
        serializer = WatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        if not pk:
            return Response({'error': 'Watch ID is required for update'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            watch = Watch.objects.get(pk=pk)
        except Watch.DoesNotExist:
            return Response({'error': 'Watch not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = WatchSerializer(watch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        if not pk:
            return Response({'error': 'Watch ID is required for delete'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            watch = Watch.objects.get(pk=pk)
            watch.delete()
            return Response({'message': 'Watch deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Watch.DoesNotExist:
            return Response({'error': 'Watch not found'}, status=status.HTTP_404_NOT_FOUND)