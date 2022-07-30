from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from newsapi import NewsApiClient

from django.contrib.auth.models import User
from .models import Teams, TeamTwitter, FavoriteTeams

from . import keys

import requests, json
import tweepy

def index(request):

    # Get MLB news articles using News API
    NEWS_API_KEY = keys.NEWS_API_KEY
    newsapi = NewsApiClient(api_key=NEWS_API_KEY)

    # Get 10 latest articles pertaining to MLB
    all_articles = newsapi.get_everything(
        q='(baseball OR MLB) NOT (college OR betting OR soccer OR nascar OR wnba OR pga OR football OR tennis OR golf OR nba OR basketball OR nfl)',
        domains='mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com',
        sort_by='publishedAt',
        page_size=10
    )

    # Define Twitter authentication token and search twitter for MLB tweets
    TWITTER_API_BEARER_TOKEN = keys.TWITTER_API_BEARER_TOKEN

    mlb_twitter_handles_url = "https://api.twitter.com/2/tweets/search/recent?query=-is:retweet from:MLB OR from:MLBNetwork OR from:MLBStats OR from:MLBReplays OR from:MLBRandomStats OR from:sn_mlb OR from:MLBONFOX OR from:CBSSportsMLB OR from:mlbtraderumors&max_results=10&tweet.fields=created_at,entities&expansions=author_id,attachments.media_keys&media.fields=height,width,url,preview_image_url,duration_ms&user.fields=profile_image_url,verified"

    payload={}
    headers = {"Authorization": "Bearer {}".format(TWITTER_API_BEARER_TOKEN)}

    mlb_twitter_handles_response = requests.request("GET", mlb_twitter_handles_url, headers=headers, data=payload)
    json_mlb_twitter_handles_response = mlb_twitter_handles_response.json()

    # Parse twitter json respone to simplify for HTML
    all_mlb_tweets = json_mlb_twitter_handles_response

    context = {'all_articles':all_articles, 'all_mlb_tweets':all_mlb_tweets}

    return render(request, "baseball/index.html", context)


def team_view(request, pk):

    # Get visited team name with spaces for the visited team page
    team_name = pk
    team_name_spaces = team_name.replace("_", " ")

    # Used to get Team image from static files
    stadium = team_name_spaces
    print(team_name_spaces)

    # Get MLB_API_ID from database and check if it exists
    if Teams.objects.filter(name_display_full=team_name_spaces).exists():
        team_info = Teams.objects.get(name_display_full=team_name_spaces)
        # Get Twitter handles for team
        team_twitter = TeamTwitter.objects.filter(team_id=team_info.id)
    else:
        return render(request, "baseball/error.html", {'pk': team_name_spaces})

    # Favorite/Unfavorite team
    if request.method == 'POST':
        if request.POST.get("button") == "unfavorite":
            print("unfavorite button works")
            FavoriteTeams.objects.get(user=request.user.id, team_name=team_info.id).delete()

        elif request.POST.get("button") == "favorite":
            print("favorite button works")
            FavoriteTeams(user=request.user, team_name=team_info).save()
        else:
            return HttpResponse("We apologize, but there was an error. Please Try again.")

    # Search Team from MLB API
    url_team_search = "http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2022'&team_id='" + team_info.MLB_API_ID + "'"
    
    payload = {}
    headers = {}

    team_search_response = requests.request("GET", url_team_search, headers=headers, data=payload)
    json_team_search_response = team_search_response.json()

    # Parse json response for team search to simplify HTML
    team = json_team_search_response["team_all_season"]["queryResults"]["row"]

    # Search 40 Man Roster from MLB API
    url_team_roster_search = "http://lookup-service-prod.mlb.com/json/named.roster_40.bam?roster_40.col_in=name_display_first_last&roster_40.col_in=player_id&roster_40.col_in=bats&roster_40.col_in=position_txt&roster_40.col_in=jersey_number&roster_40.col_in=throws&roster_40.col_in=status_code&team_id='" + team_info.MLB_API_ID + "'"
    
    payload = {}
    headers = {}

    team_roster_search_response = requests.request("GET", url_team_roster_search, headers=headers, data=payload)
    json_team_roster_search_response = team_roster_search_response.json()

    # Parse json response for team roster search to simplify HTML
    team_roster = json_team_roster_search_response["roster_40"]["queryResults"]["row"]

    # Get 6 latest articles pertaining to the visited team
    NEWS_API_KEY = keys.NEWS_API_KEY
    url_team_news = "https://newsapi.org/v2/everything?domains=mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com&sortBy=publishedAt&searchIn=title,description&pageSize=6&q=" + team_name_spaces + ""

    payload={}
    headers = {
    'X-Api-Key': NEWS_API_KEY
    }

    team_news_response = requests.request("GET", url_team_news, headers=headers, data=payload)
    json_team_news_response = team_news_response.json()

    # Simplify for HTML
    team_news = json_team_news_response

    # Define Twitter authentication token and search twitter for team related tweets
    TWITTER_API_BEARER_TOKEN = keys.TWITTER_API_BEARER_TOKEN

    team_twitter_handle_one = team_twitter[0].handle
    team_twitter_handle_two = team_twitter[1].handle

    team_twitter_handles_url = "https://api.twitter.com/2/tweets/search/recent?query=-is:retweet from:" + team_twitter_handle_one +" OR from:" + team_twitter_handle_two + "&max_results=10&tweet.fields=created_at,entities&expansions=author_id,attachments.media_keys&media.fields=height,width,url,preview_image_url,duration_ms&user.fields=profile_image_url,verified"

    payload={}
    headers = {"Authorization": "Bearer {}".format(TWITTER_API_BEARER_TOKEN)}

    team_twitter_handles_response = requests.request("GET", team_twitter_handles_url, headers=headers, data=payload)
    json_team_twitter_handles_response = team_twitter_handles_response.json()

    # Parse twitter json respone to simplify for HTML
    team_mlb_tweets = json_team_twitter_handles_response

    # Determine if current user is following team
    user_favorited = 'no'

    if FavoriteTeams.objects.filter(user=request.user.id, team_name=team_info.id).exists():
        user_favorited = 'yes'

    context = {
        'stadium':stadium, 
        'team':team,
        'team_name_spaces':team_name_spaces, 
        "team_roster":team_roster,
        "team_news":team_news,
        "team_mlb_tweets":team_mlb_tweets,
        "user_favorited": user_favorited,
    }

    return render(request, "baseball/team.html", context)


def player_view(request, pk):

    # Search player from MLB API
    url_player_search = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + pk + "'"

    payload = {}
    headers = {}

    player_search_response = requests.request("GET", url_player_search, headers=headers, data=payload)
    json_player_search_response = player_search_response.json()

    # Check and then Parse json response for player search to simplify HTML
    player_name_spaces = pk.replace("_", " ")
    if json_player_search_response["search_player_all"]["queryResults"]['totalSize'] == "0":
        return render(request, "baseball/error.html", {'pk': player_name_spaces})
    elif json_player_search_response["search_player_all"]["queryResults"]['totalSize'] > "1":
        return render(request, "baseball/multi_player_error.html", {'pk': player_name_spaces})
    else:
        player = json_player_search_response["search_player_all"]["queryResults"]["row"]

    # Search player info from MLB API via the player id
    player_id = json_player_search_response["search_player_all"]["queryResults"]["row"]["player_id"]

    url_player_info = "http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id='" + player_id + "'"

    payload = {}
    headers = {}

    player_info_response = requests.request("GET", url_player_info, headers=headers, data=payload)
    json_player_info_response = player_info_response.json()

    # Parse json response for player info to simplify HTML
    player_info = json_player_info_response["player_info"]["queryResults"]["row"]

    # Search Player Season and Career Stats
    url_season_hitting = "http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id='" + player_id + "'"
    url_career_hitting = "http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='" + player_id + "'"

    url_season_pitching = "http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='2022'&player_id='" + player_id + "'"
    url_career_pitching = "http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='" + player_id + "'"

    payload = {}
    headers = {}

    # Create variables to pass to HTML depending on current player position
    player_position = json_player_search_response["search_player_all"]["queryResults"]["row"]["position"]
    season_hitting_stats = None
    career_hitting_stats = None
    season_pitching_stats = None
    career_pitching_stats = None

    # Get the season/career stats based on current player position
    if player_position != "P":
        season_hitting_response = requests.request("GET", url_season_hitting, headers=headers, data=payload)
        career_hitting_response = requests.request("GET", url_career_hitting, headers=headers, data=payload)
        json_season_hitting_response = season_hitting_response.json()
        json_career_hitting_response = career_hitting_response.json()
        
        # Check if player has current season stats
        if json_season_hitting_response["sport_hitting_tm"]["queryResults"]["totalSize"] != "0":
            season_hitting_stats = json_season_hitting_response["sport_hitting_tm"]["queryResults"]["row"]
        career_hitting_stats = json_career_hitting_response["sport_career_hitting"]["queryResults"]["row"]
    else:
        season_pitching_response = requests.request("GET", url_season_pitching, headers=headers, data=payload)
        career_pitching_response = requests.request("GET", url_career_pitching, headers=headers, data=payload)
        json_season_pitching_response = season_pitching_response.json()
        json_career_pitching_response = career_pitching_response.json()

        # Check if player has current season stats
        if json_season_pitching_response["sport_pitching_tm"]["queryResults"]["totalSize"] != "0":
            season_pitching_stats = json_season_pitching_response["sport_pitching_tm"]["queryResults"]["row"]
        career_pitching_stats = json_career_pitching_response["sport_career_pitching"]["queryResults"]["row"]

    # Get 4 latest articles pertaining to MLB
    NEWS_API_KEY = keys.NEWS_API_KEY
    url_player_news = "https://newsapi.org/v2/everything?domains=mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com&sortBy=publishedAt&searchIn=title,description&pageSize=4&q=" + player["name_display_first_last"] + ""

    payload={}
    headers = {
    'X-Api-Key': NEWS_API_KEY
    }

    player_news_response = requests.request("GET", url_player_news, headers=headers, data=payload)
    json_player_news_response = player_news_response.json()

    # Simplify for HTML
    player_news = json_player_news_response

    # Define Twitter authentication token and search twitter for player tweets
    TWITTER_API_BEARER_TOKEN = keys.TWITTER_API_BEARER_TOKEN
    
    player_twitter_handle = player_info["twitter_id"]
    if player_twitter_handle != "":
        split_player_twitter_handle = player_twitter_handle.split("@")
        player_twitter_name = split_player_twitter_handle[1]
    

        player_twitter_handle_url = "https://api.twitter.com/2/tweets/search/recent?query=-is:retweet from:" + player_twitter_name +"&max_results=10&tweet.fields=created_at,entities&expansions=author_id,attachments.media_keys&media.fields=height,width,url,preview_image_url,duration_ms&user.fields=profile_image_url,verified"

        payload={}
        headers = {"Authorization": "Bearer {}".format(TWITTER_API_BEARER_TOKEN)}

        player_twitter_handle_response = requests.request("GET", player_twitter_handle_url, headers=headers, data=payload)
        json_player_twitter_handle_response = player_twitter_handle_response.json()

        # Parse twitter json respone to simplify for HTML
        player_mlb_tweets = json_player_twitter_handle_response

        print(player_twitter_handle_response.text)
    
    else:
        player_twitter_name = None
        player_mlb_tweets = None
 
    # Variables for HTML
    context = {
        "player": player, 
        "player_info": player_info, 
        "season_hitting_stats": season_hitting_stats,
        "career_hitting_stats": career_hitting_stats,
        "season_pitching_stats": season_pitching_stats,
        "career_pitching_stats": career_pitching_stats,
        "player_news": player_news,
        "player_twitter_name": player_twitter_name,
        "player_mlb_tweets": player_mlb_tweets
    }

    return render(request, "baseball/player.html", context)


@login_required
def profile_view(request, pk):
    user = User.objects.get(id=pk)

    # Check if profile belongs to current user
    if user != request.user:
        return HttpResponse("Sorry you are trying to view another person's user profile and this is a no-no")

    # Get user's favorite teams
    user_favorite_teams = user.favorite_teams.all()

    # Get 2 latest articles pertaining to each favorited team
    favorite_teams_articles = []

    NEWS_API_KEY = keys.NEWS_API_KEY

    for team in user_favorite_teams:
        current_team = team.team_name.name_display_full
        url_team_news = "https://newsapi.org/v2/everything?domains=mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com&sortBy=publishedAt&searchIn=title,description&pageSize=2&q=" + current_team + ""

        payload={}
        headers = {
        'X-Api-Key': NEWS_API_KEY
        }

        team_news_response = requests.request("GET", url_team_news, headers=headers, data=payload)
        json_team_news_response = team_news_response.json()
        team_news = json_team_news_response

        favorite_teams_articles.append(team_news)

    # Define Twitter authentication token and search twitter for favorited teams related tweets
    TWITTER_API_BEARER_TOKEN = keys.TWITTER_API_BEARER_TOKEN

    # Get favorited teams tweets
    favorite_teams_tweets = []

    for team in user_favorite_teams:
        # Get favorited team twitter handle and search recent tweets
        current_team_id = Teams.objects.get(name_display_full=team.team_name.name_display_full)
        team_twitter = TeamTwitter.objects.filter(team_id=current_team_id.id)
        team_twitter_handle = team_twitter[0].handle

        team_twitter_handles_url = "https://api.twitter.com/2/tweets/search/recent?query=-is:retweet from:" + team_twitter_handle + "&max_results=10&tweet.fields=created_at,entities&expansions=author_id,attachments.media_keys&media.fields=height,width,url,preview_image_url,duration_ms&user.fields=profile_image_url,verified"

        payload={}
        headers = {"Authorization": "Bearer {}".format(TWITTER_API_BEARER_TOKEN)}

        team_twitter_handles_response = requests.request("GET", team_twitter_handles_url, headers=headers, data=payload)
        json_team_twitter_handles_response = team_twitter_handles_response.json()

        team_tweets = json_team_twitter_handles_response

        favorite_teams_tweets.append(team_tweets)

    context = {
        "user": user,
        "user_favorite_teams": user_favorite_teams,
        "favorite_teams_articles": favorite_teams_articles,
        "favorite_teams_tweets": favorite_teams_tweets,
    }

    return render(request, "baseball/profile.html", context)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "baseball/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "baseball/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register_view(request):
    # Get and save registration info 
    if request.method == "POST":
        first_name = request.POST["firstname"].capitalize()
        last_name = request.POST["lastname"].capitalize()
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure passwords match
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "baseball/register.html", {
                "message": "Passwords do not match. Try again."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password, first_name=first_name, last_name=last_name)
            user.save()
        except IntegrityError:
            return render(request, "baseball/register.html", {
                "message": "Username already taken. Try again."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "baseball/register.html")