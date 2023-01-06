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
# access token is key = Refresh token 
# When Access tokens expire create a new one upon login
# Decode Token if username matches  
# then change the payload exp date to refresh the token
# Then encode it again, then send it back to them. Have frontend store it in redux or state

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

# Retrieves all users
@api_view(['GET'])
def getAll(request):
    users = Users.objects.all()
    if len(users) == 0:
        return Response({'message': 'There are currently 0 users in the database'})
    normalizer = UserSerializer(users, many=True)
    return Response(normalizer.data, status = status.HTTP_200_OK)

# Retrieve user by Id
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

# Delete all users
@api_view(['DELETE'])
def deleteAll(request):
    try:
        users = Users.objects.all()
    except:
        return Response({'message': 'There are currently no users in the database'}, status = status.HTTP_400_BAD_REQUEST)
    
    users = Users.objects.all()
    users.delete()
    return Response({'message': 'Successfully deleted all users'}, status = status.HTTP_200_OK)

# Delete specific user
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
    # High salt = stronger hashes
    salt = bcrypt.gensalt(8)

    # Checks if a username is already taken
    try:
        getUsers = Users.objects.get(username = username)
        normalizer = UserSerializer(getUsers, many = False)
        return Response({
            'message': f"A user with username of '{username}' already exist"
        }, status = status.HTTP_400_BAD_REQUEST)
    # If not Hashes and stores the password and Creates a refresh token along with the user 
    except:
        hashPassword = bcrypt.hashpw(password.encode('UTF-8'), salt)
        stringHash = hashPassword.decode()


        payload_data = {
            'username': username,
            'password': stringHash,
            'exp': refreshTokenExp,
        }

        # token Key
        refreshToken = jwt.encode(
            payload = payload_data,
            key = os.environ.get('PandoraTokenKey'),
        )

        user = {
            'username': username,
            'password': stringHash,
            'date_created': current_datetime,
            'admin': False,
            'first_login': True,
            'token': refreshToken,
        }

        serializer = UserSerializer(data = user)
        if serializer.is_valid():
            serializer.save()
        return Response({
            'message': 'Successfully created User!'
        }, status = status.HTTP_201_CREATED)

# User Logging In 
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

    # Checks if access token is expired
    def expiredAccess():
        accessToken = normalizer.data['accessToken']
        tokenKey = os.environ.get('PandoraTokenKey')
        jwtHeader = jwt.get_unverified_header(accessToken)
        try: 
            verify = jwt.decode(accessToken, key=tokenKey, algorithms= [jwtHeader['alg']])
            return False
        except ExpiredSignatureError as error:
            return True

    # Checks if Refresh token is expired
    def expiredRefresh():
        refreshToken = normalizer.data['token']
        tokenKey = os.environ.get('PandoraTokenKey')
        jwtHeader = jwt.get_unverified_header(accessToken)
        try: 
            verify = jwt.decode(refreshToken, key=tokenKey, algorithms= [jwtHeader['alg']])
            return False
        except ExpiredSignatureError as error:
            return True

    results = bcrypt.checkpw(password.encode('UTF-8'), hashPassword.encode())

    if results == False:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST)

    elif len(normalizer.data) == 0:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status.HTTP_400_BAD_REQUEST)

    elif normalizer.data['first_login'] == True:
        if normalizer.data['accessToken'] is None:
            accessToken = jwt.encode(
                payload = {'exp': accessTokenExp},
                key = os.environ.get('PandoraTokenKey'),
            )
            
            # Changes we're making to the user in the database
            updateInfo = {
                'accessToken': accessToken,
                'first_login': False,
            }

            updateUser = UserSerializer(instance = user, data = updateInfo, partial = True)

            if updateUser.is_valid():
                updateUser.save()
                return Response({
                    'message': 'Welcome to Pandora Extravaganza',
                    'accessToken': accessToken,
                })
            else:
                return Response({'message': 'Error updating user'}, status = status.HTTP_400_BAD_REQUEST)

    # elif expiredAccess() == True:
    # Create a condition where if access and refresh are expired create both
    # create a condition where if access is expired create access

    else:
        refreshToken = normalizer.data['token']
        tokenKey = os.environ.get('PandoraTokenKey')
        jwtHeader = jwt.get_unverified_header(refreshToken)
        try:
            verify = jwt.decode(refreshToken, key = tokenKey, algorithms = [jwtHeader['alg']])
            newAccessToken = jwt.encode(
                payload = {
                    'username': normalizer.data['username'],
                    'password': normalizer.data['password'],
                    'exp': accessTokenExp,
                },
                key = tokenKey,
            )

            newAccessInfo = {
                'accessToken': newAccessToken
            }

            updateUser = UserSerializer(instance = user, data = newAccessInfo, partial = True)
            
            if updateUser.is_valid():
                updateUser.save()
                return Response({'message': 'new AccessToken!'})
            else:
                return Response({'message': 'Internal Error'})
        except ExpiredSignatureError as error:
            newRefreshToken = jwt.encode(
                payload= {
                    'username': normalizer.data['username'],
                    'password': normalizer.data['password'],
                    'exp': refreshTokenExp,
                },
                key = tokenKey,
            )

            newAccessToken = jwt.encode(
                payload = {
                    'username': normalizer.data['username'],
                    'password': normalizer.data['password'],
                    'exp': accessTokenExp,
                },
                key = tokenKey,
            )

            newRefreshInfo = {
                'token': newRefreshToken,
                'accessToken': newAccessToken,
            }

            updateUser = UserSerializer(instance = user, data = newRefreshInfo, partial = True)

            if updateUser.is_valid():
                updateUser.save()
                return Response({'message': 'updated refresh token'})
            else:
                return Response({'message': f'Internal Error, {error}'})