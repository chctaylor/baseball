from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render

def index(request):
    return HttpResponse("Welcome to the final project")
