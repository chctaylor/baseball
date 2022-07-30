from django.contrib import admin

from .models import Teams, TeamTwitter, FavoriteTeams
# Register your models here.

admin.site.register(Teams)
admin.site.register(TeamTwitter)
admin.site.register(FavoriteTeams)