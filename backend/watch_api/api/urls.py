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
    path("register/", views.register_view , name="user_register"),
    path('login/', views.login_view , name="user_login"),
    path('logout/', views.logout_view , name="user_logout"),
    path('watches/my-watches/', views.my_watches , name="watch_list_user"),
    path("me/", views.current_user_view, name="current-user"),
    path('total_value_per_seller/', views.total_value_per_seller, name="total_value_per_seller"),
    path('watches_per_category/' , views.watches_per_category , name="watches_per_category"),
    path('avg_price_by_condition/' , views.avg_price_by_condition , name="avg_price_by_condition"),
    path('top_sellers/' , views.top_sellers , name="top_sellers"),
    path('logs_list/' , views.logs_list , name="logs_list"),
    path("watches_grouped_name/", views.watches_grouped_by_name_letter, name="watches_grouped_name"),
    path("user/profile/", views.user_profile_view, name="profile"),
    path("user/change_password/", views.change_password, name="change_password"),
    path("user/delete_account/" , views.delete_account , name="delete_account"),

]