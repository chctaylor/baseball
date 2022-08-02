# Generated by Django 4.0.5 on 2022-07-31 01:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('baseball', '0004_rename_team_favoriteteams_team_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavoritePlayers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=64)),
                ('MLB_API_ID', models.CharField(max_length=16)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='favorite_players', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]