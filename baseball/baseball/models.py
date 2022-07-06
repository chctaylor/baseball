from django.db import models

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