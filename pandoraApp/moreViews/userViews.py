from ..serializers import Users, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from jwt.exceptions import ExpiredSignatureError
from datetime import datetime, timedelta
import os
import jwt
import bcrypt
# Imports line notes: 84,
# Refresh token is created on register. Then access token is created/refreshed upon login. Refresh last: 90days, Access last: 60days. 
# When Access tokens expire create a new one upon login
# Decode Token then change the payload exp date to refresh the token
# Then encode it again, then send it back to them

# Global Variables
current_datetime = datetime.today()
refreshTokenExp = current_datetime + timedelta(days= 90)
accessTokenExp = current_datetime + timedelta(days=60)

@api_view(['POST'])
def accessToken(request):
    try:
        jwtHeader = jwt.get_unverified_header(request.data['token'])
    except:
        return Response({'message': 'Token is not correct or invalid'})
    try:
        verify = jwt.decode(request.data['token'], key = os.environ.get('PandoraTokenKey'), algorithms = [jwtHeader['alg']])
        return Response({'message': verify})
    except ExpiredSignatureError as error:
        print(current_datetime)
        return Response({'message': f"Unable to decode the token, error: {error}"})

# Retrieves all Users
@api_view(['GET'])
def getAll(request):
    users = Users.objects.all()
    if len(users) == 0:
        return Response({'message': 'There are currently 0 users in the database'})
    normalizer = UserSerializer(users, many=True)
    return Response(normalizer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def getById(request, id):
    requestedUser = ''
    users = Users.objects.all()
    normalizer = UserSerializer(users, many=True)
    for x in normalizer.data:
        if x['id'] == id:
            requestedUser = x
    if requestedUser == '':
        return Response({'message': 'user with that id does not exist'}, status = status.HTTP_404_NOT_FOUND) 
    return Response(requestedUser, status = status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteAll(request):
    try:
        users = Users.objects.all()
    except:
        return Response({'message': 'There are currently no users in the database'}, status = status.HTTP_400_BAD_REQUEST)
    
    users = Users.objects.all()
    users.delete()
    return Response({'message': 'Successfully deleted all users'}, status = status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteUser(request):
    try:
        username = request.data['username']
    except:
        return Response({'message': 'username is required'})
    try:
        user = Users.objects.get(username = request.data['username'])
    except:
        return Response({'message': f"The user with the username of '{request.data['username']}' does not exist"}, status = status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return Response({'message': f"{request.data['username']} successfully deleted"})

# Creates a new user
@api_view(['POST'])
def registerUser(request):

    username = request.data['username']
    password = request.data['password']
    salt = bcrypt.gensalt(8)

    try:
        getUsers = Users.objects.get(username = username)
        normalizer = UserSerializer(getUsers, many = False)
        return Response({
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
        return Response({
            'message': 'Successfully created User!'
        }, status = status.HTTP_201_CREATED)

# User Logging In 
# Add to sqlite model. First_login: default(false).
# first_login == true - create a access token
# first_login == false - refresh access token
# access token == expired - create a new access token
@api_view(['POST'])
def loginUser(request):
    try:
        username = request.data['username']
    except:
        return Response({'message': 'username is required'}, status = status.HTTP_400_BAD_REQUEST)
    
    try:
        password = request.data['password']
    except:
        return Response({'message': 'password is required'}, status = status.HTTP_400_BAD_REQUEST)
    
    try:
        user = Users.objects.get(username = username)
    except:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_404_NOT_FOUND)

    normalizer = UserSerializer(user, many = False)
    hashPassword = normalizer.data['password']

    results = bcrypt.checkpw(password.encode('UTF-8'), hashPassword.encode())

    if results == False:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST)
    elif len(normalizer.data) == 0:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status.HTTP_400_BAD_REQUEST)

    payload_data = {
        'username': username,
        'password': password,
        'exp': current_datetime,
    }

    # token Key 
    token = jwt.encode(
        payload = payload_data,
        key = os.environ.get('PandoraTokenKey'),
    )
    payload_data['password'] = hashPassword
    payload_data['token'] = token

    normalizer = UserSerializer(instance = user, data = payload_data)

    if normalizer.is_valid():
        normalizer.save()
    return Response({
        'message': 'Welcome to Pandora Extravaganza',
        'token': token,
    }, status = status.HTTP_202_ACCEPTED)