from django.urls import path, include
from api import views

urlpatterns = [
    path('ping/', views.ping, name='ping'),
    path('watches/create/', views.watch_create, name='watch_create'),
    path('watches/' , views.watch_list, name='watch_list'),
    path('watches/<int:pk>/update/', views.watch_update, name='watch_update'),
    path("watches/<int:pk>/delete/", views.delete_watch, name="watch_delete"),

    
]