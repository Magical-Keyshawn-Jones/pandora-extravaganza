from ..serializers import Users, UserSerializer
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import os
import jwt
import bcrypt
# Imports line notes: 84,

    # jwtHeader = jwt.get_unverified_header(token)
    # try:
    #     verify = jwt.decode(token, key = jwtKey, algorithms = [jwtHeader['alg']])
    # except ExpiredSignatureError as error:
    #     print(f'signature expired, {error}')

@api_view(['POST'])
def verifyToken(request):
    jwtHeader = jwt.get_unverified_header(request.data['token'])
    try:
        verify = jwt.decode(request.data['token'], key = os.environ('PandoraTokenKey'), algorithms = [jwtHeader['alg']])
        return JsonResponse({'message': verify})
    except:
        return JsonResponse({'yup': 'nope'})

# Retrieves all Users
@api_view(['GET'])
def getAll(request):
    users = Users.objects.all()
    normalizer = UserSerializer(users, many=True)
    return Response(normalizer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def getById(request, id):
    try:
        requestedUser = ''
        users = Users.objects.all()
        normalizer = UserSerializer(users, many=True)
        for x in normalizer.data:
            print(x)
            if x['id'] == id:
                requestedUser = x
        return Response(requestedUser, status = status.HTTP_200_OK)
    except:
        return JsonResponse({'message': 'user with that id does not exist'}, status = status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def deleteUser(request):
    try:
        username = request.data['username']
    except:
        return JsonResponse({'message': 'username is required'})
    try:
        user = Users.objects.get(username = request.data['username'])
    except:
        return JsonResponse({'message': f"The user with the username of '{request.data['username']}' does not exist"}, status = status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return JsonResponse({'message': f"{request.data['username']} successfully deleted"})

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
            'message': f"A user with username of '{username}' already exist"
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
    try:
        username = request.data['username']
    except:
        return JsonResponse({'message': 'username is required'}, status = status.HTTP_400_BAD_REQUEST)
    
    try:
        password = request.data['password']
    except:
        return JsonResponse({'message': 'password is required'}, status = status.HTTP_400_BAD_REQUEST)
    
    # This Code Block Doesn't trigger
    # try:
    #     password = request.data['password']
    #     username = request.data['username']
    # except:
    #     return JsonResponse({'message': 'username & password are required'}, status = status.HTTP_400_BAD_REQUEST)

    try:
        user = Users.objects.get(username = username)
    except:
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_404_NOT_FOUND)

    normalizer = UserSerializer(user, many = False)
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

    # jwtHeader = jwt.get_unverified_header(request.data['token'])
    # try:
    #     verify = jwt.decode(token, key = os.environ('PandoraTokenKey'), algorithms = [jwtHeader['alg']])
    #     return JsonResponse({'message': verify})
    # except:
    #     return JsonResponse({'yup': 'nope'})

    normalizer = UserSerializer(instance = user, data = payload_data)

    if normalizer.is_valid():
        normalizer.save()
    return JsonResponse({
        'message': 'Welcome to Pandora Extravaganza',
        'token': token,
    }, status = status.HTTP_202_ACCEPTED)