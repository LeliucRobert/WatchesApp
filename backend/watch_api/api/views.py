from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Watch, WatchFile, LogEntry
from django.contrib.auth.models import User
from .serializers import WatchSerializer, WatchFileSerializer, LogEntrySerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.settings import api_settings
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAdminUser
from .utils.logging import create_log
# GET all watches or POST (create new watch)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def watch_create(request):
    print(request.data)
    serializer = WatchSerializer(data=request.data , context={'request': request})
    if serializer.is_valid():

        watch = serializer.save(seller=request.user)
        files = request.FILES.getlist('media')

        for file in files:
            file_type = 'image' if 'image' in file.content_type else 'video'
            WatchFile.objects.create(watch=watch, file=file, file_type=file_type)
        print(request.user)
        create_log(request.user, "CREATE", "Watch", watch.id)

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
@permission_classes([IsAuthenticated])
def watch_update(request, pk):
    try:
        watch = Watch.objects.get(pk=pk)
    except Watch.DoesNotExist:
        return Response({'error': 'Watch not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = WatchSerializer(watch, data=request.data, context={'request': request})
    if serializer.is_valid():
        updated_watch = serializer.save(seller=request.user)

        # Optional: delete previous media files if needed
        # updated_watch.media.all().delete()

        existing_ids = request.data.getlist('existing_media_ids')
        watch.media.exclude(id__in=existing_ids).delete()

        # Add new uploaded media files
        files = request.FILES.getlist('media')
        for file in files:
            file_type = 'image' if 'image' in file.content_type else 'video'
            WatchFile.objects.create(watch=updated_watch, file=file, file_type=file_type)
        create_log(request.user, "UPDATE", "Watch", watch.id)

        return Response(WatchSerializer(updated_watch, context={'request': request}).data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_watch(request, pk):
    try:
        watch = Watch.objects.get(pk=pk)
        create_log(request.user, "DELETE", "Watch", watch.id)
        watch.delete()
        return Response({"message": "Watch deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Watch.DoesNotExist:
        return Response({"error": "Watch not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def my_watches(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=401)

    watches = Watch.objects.filter(seller=request.user)
    serializer = WatchSerializer(watches, many=True, context={'request': request})
    return Response(serializer.data)


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



# @api_view(['POST'])
# def register(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     email = request.data.get('email')
#     if not username or not password:
#         return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

#     if User.objects.filter(username=username).exists():
#         return Response({'error': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

#     user = User.objects.create_user(username=username, email=email, password=password)
#     create_log("CREATE", "User", user.id)

#     return Response({'message': 'User registered successfully.'})
# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful.'})
    else:
        return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework_simplejwt.tokens import RefreshToken

@api_view(["POST"])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=401)
from django.contrib.auth.hashers import make_password
@api_view(["POST"])
def register_view(request):

    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password)
    )
    create_log(user, "CREATE", "User", user.id)

    return Response({'message': 'User registered successfully!'})

from rest_framework_simplejwt.tokens import RefreshToken, TokenError

@api_view(["POST"])
def logout_view(request):
    try:
        refresh_token = request.data.get("refresh")

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logged out successfully"})
    except TokenError:
        return Response({"error": "Invalid token"}, status=400)

@api_view(['POST'])
def user_logout(request):
    logout(request)
    return Response({'message': 'Logged out successfully.'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
    })

from django.db.models import Sum

@api_view(['GET'])

def total_value_per_seller(request):
    
    data = (
        User.objects
        .filter(watches__isnull=False)
        .annotate(total_value=Sum("watches__price"))
        .values("id", "username", "total_value")
    )
    return Response(data)

from django.db.models import Count

@api_view(["GET"])
def watches_per_category(request):
    data = (
        Watch.objects
        .values("category")
        .annotate(total=Count("id"))
        .order_by("-total")
    )
    return Response(data)

from django.db.models import Avg

@api_view(["GET"])
def avg_price_by_condition(request):
    data = (
        Watch.objects
        .values("condition")
        .annotate(avg_price=Avg("price"))
        .order_by("condition")
    )
    return Response(data)

@api_view(["GET"])
def top_sellers(request):
    data = (
        User.objects
        .annotate(total=Count("watches"))
        .filter(total__gt=0)
        .order_by("-total")[:5]
        .values("id", "username", "total")
    )
    return Response(data)

@api_view(['GET'])
def logs_list(request):
    logs = LogEntry.objects.select_related("user").order_by("-timestamp")[:100]
    serializer = LogEntrySerializer(logs, many=True)
    return Response(serializer.data)

from django.db.models.functions import Substr

@api_view(["GET"])
def watches_grouped_by_name_letter(request):
    data = (
        Watch.objects
        .annotate(first_letter=Substr("name", 1, 1))
        .values("first_letter")
        .annotate(total=Count("id"))
        .order_by("-total")
    )
    return Response(data)

from .serializers import UserProfileSerializer

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def user_profile_view(request):
    if request.method == "GET":
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        print(request)
        create_log(request.user, "UPDATE", "User", request.user.id)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    if not user.check_password(current_password):
        return Response({"error": "Current password is incorrect"}, status=400)

    user.set_password(new_password)
    user.save()
    create_log(request.user, "UPDATE", "User", user.id)

    return Response({"message": "Password updated successfully"})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    create_log(request.user, "DELETE", "User", user.id)
    
    user.delete()
    
    return Response({"message": "Account deleted"}, status=200)

# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def change_password(request):
#     user = request.user
#     current_password = request.data.get("current_password")
#     new_password = request.data.get("new_password")

#     if not user.check_password(current_password):
#         return Response({"error": "Current password is incorrect"}, status=400)

#     user.set_password(new_password)
#     user.save()
#     return Response({"message": "Password updated successfully"})
