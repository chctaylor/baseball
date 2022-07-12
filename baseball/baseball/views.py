from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render

from newsapi import NewsApiClient

from .models import Teams, TeamTwitter

import requests, json

def index(request):

    # Get MLB news articles using News API
    newsapi = NewsApiClient(api_key='093cee10911e400eb1a2c2d6e778e43c') # NEED TO HIDE MY API KEY

    # Get 10 latest articles pertaining to MLB
    all_articles = newsapi.get_everything(
        q='(baseball OR MLB) NOT (college OR betting OR soccer OR nascar OR wnba OR pga OR football OR tennis OR golf OR nba)',
        domains='mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com',
        sort_by='publishedAt',
        page_size=10
    )

    context = {'all_articles':all_articles}

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
    else:
        return render(request, "baseball/error.html", {'pk': team_name_spaces})
    print(team_info.MLB_API_ID)

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
    url_team_news = "https://newsapi.org/v2/everything?domains=mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com&sortBy=publishedAt&searchIn=title,description&pageSize=6&q=" + team_name_spaces + ""

    payload={}
    headers = {
    'X-Api-Key': '093cee10911e400eb1a2c2d6e778e43c' # NEED TO HIDE MY API KEY
    }

    team_news_response = requests.request("GET", url_team_news, headers=headers, data=payload)
    json_team_news_response = team_news_response.json()

    # Simplify for HTML
    team_news = json_team_news_response    


    context = {
        'stadium':stadium, 
        'team':team,
        'team_name_spaces':team_name_spaces, 
        "team_roster":team_roster,
        "team_news":team_news
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
    if json_player_search_response["search_player_all"]["queryResults"]['totalSize'] == "0":
        return render(request, "baseball/error.html", {'pk': pk})
    else:
        player = json_player_search_response["search_player_all"]["queryResults"]["row"]

    # Get correct team name from team id (Cleveland Guardians/Indians issue with MLB API)
    team_mlb_api_id = json_player_search_response["search_player_all"]["queryResults"]["row"]["team_id"]
    correct_team = Teams.objects.get(MLB_API_ID=team_mlb_api_id)
    print(correct_team.name_display_full)


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
    url_player_news = "https://newsapi.org/v2/everything?domains=mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com&sortBy=publishedAt&searchIn=title,description&pageSize=4&q=" + player["name_display_first_last"] + ""

    payload={}
    headers = {
    'X-Api-Key': '093cee10911e400eb1a2c2d6e778e43c' # NEED TO HIDE MY API KEY
    }

    player_news_response = requests.request("GET", url_player_news, headers=headers, data=payload)
    json_player_news_response = player_news_response.json()

    # Simplify for HTML
    player_news = json_player_news_response
 

    # Variables for HTML
    context = {
        "player": player, 
        "player_info": player_info, 
        "season_hitting_stats": season_hitting_stats,
        "career_hitting_stats": career_hitting_stats,
        "season_pitching_stats": season_pitching_stats,
        "career_pitching_stats": career_pitching_stats,
        "player_news": player_news,
        "correct_team": correct_team,
    }

    return render(request, "baseball/player.html", context)