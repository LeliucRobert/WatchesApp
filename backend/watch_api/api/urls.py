from django.urls import path, include
from .views import watch

urlpatterns = [
    path('watch/' , watch),
    path('watch/<int:pk>/' , watch), # URL pattern for watch with a specific ID
]