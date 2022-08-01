from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Teams(models.Model):
    name_display_full = models.CharField(max_length=64)
    MLB_API_ID = models.CharField(max_length=8)
    division = models.CharField(max_length=16)
    name_abbrev = models.CharField(max_length=8)

    def __str__(self):
        return self.name_display_full

class TeamTwitter(models.Model):
    team_id = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name="twitter_handle")
    handle = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.team_id} handle: {self.handle}"

class FavoriteTeams(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorite_teams")
    team_name = models.ForeignKey(Teams, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} favortied the {self.team_name}"

class FavoritePlayers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorite_players")
    player_name = models.CharField(max_length=64)
    player_position = models.CharField(max_length=16)
    player_team_full = models.CharField(max_length=64)
    player_team_abbrev = models.CharField(max_length=8)
    MLB_API_ID = models.CharField(max_length=16)

    def __str__(self):
        return f"{self.user} favortied {self.player_name}"