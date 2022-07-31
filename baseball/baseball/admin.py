from django.contrib import admin

from .models import Teams, TeamTwitter, FavoriteTeams, FavoritePlayers
# Register your models here.

admin.site.register(Teams)
admin.site.register(TeamTwitter)
admin.site.register(FavoriteTeams)
admin.site.register(FavoritePlayers)