from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from ..serializers import UserSerializer, Users
from jwt.exceptions import ExpiredSignatureError
from ..secrets import jwtKey
import jwt
import bcrypt
# I don't know how to hide jwt key in production

    # jwtHeader = jwt.get_unverified_header(token)
    # try:
    #     verify = jwt.decode(token, key = jwtKey, algorithms = [jwtHeader['alg']])
    # except ExpiredSignatureError as error:
    #     print(f'signature expired, {error}')



# User Functions
# Retrieve all Users
@api_view(['GET'])
def getAll(request):
    users = Users.objects.all()
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data, status = status.HTTP_200_OK)

# Deletes Specific User
@api_view(['POST'])
def deleteUser(request):
    try:
        users = Users.objects.get(username=request.data['username'])
        serializer = UserSerializer(users, many=False)
        users.delete()
        return JsonResponse({
            'message': f"Successfully deleted user with username of {serializer.data['username']}"
        }, status = status.HTTP_200_OK)
    except:
        return JsonResponse({
            'message': f"User with username of {request.data['username']} does not exist"
        }, status = status.HTTP_404_NOT_FOUND)

# Create a new User
@api_view(['POST'])
def registerUser(request):

    username = request.data['username']
    password = request.data['password']
    salt = bcrypt.gensalt(8)

    try:
        getUsers = Users.objects.get(username = username)
        normalizer = UserSerializer(getUsers, many=False)
        return JsonResponse({
            'message': 'A user with that username already exist'
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

@api_view(['POST'])
def loginUser(request):
    username = request.data['username']
    password = request.data['password']
    
    try:
        users = Users.objects.get(username = username)
    except: 
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(users, many=False)
    hashPassword = serializer.data['password']

    results = bcrypt.checkpw(password.encode('UTF-8'), hashPassword.encode())

    if results == False:
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST)
    elif len(serializer.data) == 0:
        return JsonResponse({
            'message': 'Username or Password is Incorrect'
        }, status = status.HTTP_400_BAD_REQUEST) 

    payload_data = {
        'username': username,
        'password': password,
    }

    token = jwt.encode(
        payload = payload_data,
        key = jwtKey,
        # I don't know how to hide jwt key in production
    )
    payload_data['password'] = hashPassword
    payload_data['token'] = token

    serializer = UserSerializer(instance=users, data=payload_data)

    if serializer.is_valid():
        serializer.save()

    return JsonResponse({
        'message': 'Welcome to Sylvia!'
    }, status = status.HTTP_200_OK)