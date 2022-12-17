from ..serializers import Users, UserSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import os
import jwt
import bcrypt

# Retrieves all Users
@api_view(['GET'])
def getAll(request):
    users = Users.objects.all()
    normalizer = UserSerializer(users, many=True)
    return Response(normalizer.data, status = status.HTTP_200_OK)

# Creates a new user
@api_view(['POST'])
def registerUser(request):

    username = request.data['username']
    password = request.data['password']
    salt = bcrypt.gensalt(8)

    try:
        getUsers = Users.objects.get(username = username)
        normalizer = UserSerializer(getUsers, many = False)
        return JsonResponse({
            'message': f"A user with username of {username} already exist"
        }, status = status.HTTP_400_BAD_REQUEST)
    except:
        hashPassword = bcrypt.hashpw(password.encode('UTF-8'), salt)
        stringHash = hashPassword.decode()

        user = {
            'username': username,
            'password': stringHash,
        }

        serializer = UserSerializer(data = user)
        if serializer.is_valid():
            serializer.save()
        return JsonResponse({
            'message': 'Successfully created User!'
        }, status = status.HTTP_201_CREATED)

# User Logging In 
@api_view(['POST'])
def loginUser(request):

    username = request.data['username']
    password = request.data['password']

    try:
        user = Users.objects.get(username = username)
    except:
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_404_NOT_FOUND)

    normalizer = UserSerializer(users, many = False)
    hashPassword = normalizer.data['password']

    results = bcrypt.checkpw(password.encode('UTF-8'), hashPassword.encode())

    if results == False:
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST)
    elif len(normalizer.data) == 0:
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status.HTTP_400_BAD_REQUEST)

    payload_data = {
        'username': username,
        'password': password,
    }

    # token Key 
    token = jwt.encode(
        payload = payload_data,
        key = os.environ.get('PandoraTokenKey')
    )
    payload_data['password'] = hashPassword
    payload_data['token'] = token

    normalizer = UserSerializer(instance = user, data = payload_data)

    if normalizer.is_valid():
        normalizer.save()
    return JsonResponse({
        'message': 'Welcome to Pandora Extravaganza'
    }, status = status.HTTP_202_ACCEPTED)