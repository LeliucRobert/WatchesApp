from django.urls import path, include
from api import views

urlpatterns = [
    path('ping/', views.ping, name='ping'),
    path('watches/create/', views.watch_create, name='watch_create'),
    path('watches/' , views.watch_list, name='watch_list'),
    path('watches/<int:pk>/update/', views.watch_update, name='watch_update'),
    path("watches/<int:pk>/delete/", views.delete_watch, name="watch_delete"),
    path("watches/seller/<int:seller_id>/", views.watch_list_by_seller, name="watch_list_by_seller"),

    path("start_generator/", views.api_start_generator, name='watch_generator_start'),
    path("stop_generator/", views.api_stop_generator, name='watch_generator_stop'),
    path("register/", views.register , name="user_register"),
    path('login/', views.user_login , name="user_login"),
    path('logout/', views.user_logout , name="user_logout"),
    path('my-watches/', views.my_watches , name="watch_list_user"),
]