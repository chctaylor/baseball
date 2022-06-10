from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render

import requests

def index(request):

    context = {}

    return render(request, "baseball/index.html", context)
