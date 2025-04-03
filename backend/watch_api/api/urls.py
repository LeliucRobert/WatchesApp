from django.urls import path, include
from api import views

urlpatterns = [
    
    path('watches/create/', views.watch_create, name='watch_create'),
    path('watches/' , views.watch_list, name='watch_list'),
    
]