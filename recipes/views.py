from django.shortcuts import render

from rest_framework import viewsets
from .models import Recipe
from .serializers import RecipeSerializer
from django.http import HttpResponse

# Create your views here.
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all().order_by('-created_at')
    serializer_class = RecipeSerializer

def home(request):
    return HttpResponse("Welcome to the Cookbook API 👨‍🍳! Visit /api/recipes/ to get started.")