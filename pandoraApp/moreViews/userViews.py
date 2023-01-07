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
# Used to testing responses
yup = {'message': 'it works!!!'}
nope = {'message': 'it Sucks!'}

# Encrypts a password and returns the stringHash
def encryptPassword(password):
    # High salt = stronger hashes
    salt = bcrypt.gensalt(12)
    hashPassword = bcrypt.hashpw(password.encode('UTF-8'), salt)
    return hashPassword.decode()

# Checks for correct user login
def userChecker(request):
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
        return Response({'message': 'Username or Password is Incorrect'})
    else:
        return {
            'results': results,
            'user': user,
            'normalizer': normalizer,
        }

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
    return Response({'id': requestedUser['id'], 'username': requestedUser['username'], 'admin': requestedUser['admin']}, status = status.HTTP_200_OK)

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

# Makes changes to the user
@api_view(['PUT'])
def changeUserInfo(request):
    userData = userChecker(request)
    specialChanges = ''

    if isinstance(userData, Response):
        return userData
    
    if 'password' in request.data['newChanges']:
        specialChanges = request.data['newChanges']
        specialChanges['password'] = encryptPassword(request.data['newChanges']['password'])
    else:
        specialChanges = request.data['newChanges']

    userChanges = UserSerializer(instance = userData['user'], data = specialChanges, partial = True)

    # In the future list where the changes was made in the message. Likely using a loop
    if userChanges.is_valid():
        userChanges.save()
        return Response({'message': 'Successfully made the changes to the user'}, status = status.HTTP_200_OK)
    else:
        return Response({'message': 'Error implementing changes. Changes were not made.'}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    


# Creates a new user
@api_view(['POST'])
def registerUser(request):

    username = request.data['username']
    password = request.data['password']

    # Checks if a username is already taken
    try:
        getUsers = Users.objects.get(username = username)
        normalizer = UserSerializer(getUsers, many = False)
        return Response({
            'message': f"A user with username of '{username}' already exist"
        }, status = status.HTTP_400_BAD_REQUEST)
    # If not Hashes and stores the password and Creates a refresh token along with the user 
    except:
        stringHash = encryptPassword(password)


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
@api_view(['POST'])
def loginUser(request):
    userData = userChecker(request)

    if  isinstance(userData, Response):
        return userData

    # Checks the password
    if  userData['results'] == False:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST)
    
    # Checks if user exist in database
    elif len(userData['normalizer'].data) == 0:
        return Response({
            'message': 'Username or Password is Incorrect'
        }, status.HTTP_400_BAD_REQUEST)

    # First time logging in?
    elif userData['normalizer'].data['first_login'] == True:
        if userData['normalizer'].data['accessToken'] is None:
            accessToken = jwt.encode(
                payload = {'exp': accessTokenExp},
                key = os.environ.get('PandoraTokenKey'),
            )
            
            # Changes we're making to the user in the database
            updateInfo = {
                'accessToken': accessToken,
                'first_login': False,
            }

            updateUser = UserSerializer(instance = userData['user'], data = updateInfo, partial = True)

            if updateUser.is_valid():
                updateUser.save()
                return Response({
                    'message': 'Welcome to Pandora Extravaganza',
                    'accessToken': accessToken,
                })
            else:
                return Response({'message': 'Error updating user'}, status = status.HTTP_400_BAD_REQUEST)

    else:
        refreshToken = userData['normalizer'].data['token']
        tokenKey = os.environ.get('PandoraTokenKey')
        jwtHeader = jwt.get_unverified_header(refreshToken)
        # Checks if refresh token has expired. If not refresh the access token
        try:
            verify = jwt.decode(refreshToken, key = tokenKey, algorithms = [jwtHeader['alg']])
            newAccessToken = jwt.encode(
                payload = {
                    'username': userData['normalizer'].data['username'],
                    'password': userData['normalizer'].data['password'],
                    'exp': accessTokenExp,
                },
                key = tokenKey,
            )

            newAccessInfo = {
                'accessToken': newAccessToken
            }

            updateUser = UserSerializer(instance = userData['user'], data = newAccessInfo, partial = True)
            
            if updateUser.is_valid():
                updateUser.save()
                return Response({
                    'message': 'Welcome to Pandora Extravaganza!',
                    'accessToken': newAccessToken
                }, status = status.HTTP_200_OK)
            else:
                return Response({'message': 'Internal Error'})

        # If refresh token has expired. Create a new refresh token and refresh the access token 
        except ExpiredSignatureError as error:
            newRefreshToken = jwt.encode(
                payload= {
                    'username': userData['normalizer'].data['username'],
                    'password': userData['normalizer'].data['password'],
                    'exp': refreshTokenExp,
                },
                key = tokenKey,
            )

            newAccessToken = jwt.encode(
                payload = {
                    'username': userData['normalizer'].data['username'],
                    'password': userData['normalizer'].data['password'],
                    'exp': accessTokenExp,
                },
                key = tokenKey,
            )

            newRefreshInfo = {
                'token': newRefreshToken,
                'accessToken': newAccessToken,
            }

            updateUser = UserSerializer(instance = userData['user'], data = newRefreshInfo, partial = True)

            if updateUser.is_valid():
                updateUser.save()
                return Response({
                    'message': 'Welcome to Pandora Extravaganza',
                    'accessToken': newAccessToken,
                }, status = status.HTTP_200_OK)
            else:
                return Response({'message': f'Internal Error, {error}'})