from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render

from newsapi import NewsApiClient

import requests, json

def index(request):

    # Get MLB news articles using News API
    newsapi = NewsApiClient(api_key='093cee10911e400eb1a2c2d6e778e43c') # NEED TO HIDE MY API KEY

    # Get 10 latest articles pertaining to MLB
    all_articles = newsapi.get_everything(
        q='(baseball OR MLB) NOT (college OR betting OR soccer OR nascar OR wnba OR pga)',
        domains='mlb.com, espn.com, foxsports.com, nbcsports.com, cbssports.com',
        sort_by='publishedAt',
        page_size=10
    )

    context = {'all_articles':all_articles}

    return render(request, "baseball/index.html", context)


def team_view(request):

    context = {}

    return render(request, "baseball/team.html", context)


def player_view(request, pk):

    pk = "brandon"

    context = {}

    return render(request, "baseball/player.html", context)