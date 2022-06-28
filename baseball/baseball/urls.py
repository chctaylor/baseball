from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("team/", views.team_view, name="team_view"),
    path("player/<str:pk>", views.player_view, name="player_view")
]