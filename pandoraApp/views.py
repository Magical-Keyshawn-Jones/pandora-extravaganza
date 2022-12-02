from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
def index(request):
    return render(request, 'index.html')

def test1(request):
    comments = [
        {
            'name': 'Bellventus',
            'username': 'Billy',
            'text': "I dont' care!"
        },
        {
            'name': 'Kriegster',
            'username': 'Tommy',
            'text': 'Wow, want to go to the mall?' 
        }
    ]

    return JsonResponse({'comments': comments})

def test2(request):
    return JsonResponse({'message': "The test works!"}, status = status.HTTP_200_OK)

@api_view(['GET'])
def test3(request):
    testing = {
        'message': "It works!",
    }
    return Response(testing)