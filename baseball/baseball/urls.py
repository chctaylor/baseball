from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("team/<str:pk>", views.team_view, name="team_view"),
    path("player/<str:pk>", views.player_view, name="player_view"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register_view, name="register")
]