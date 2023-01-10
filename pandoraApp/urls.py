from django.urls import path
from . import views
from .moreViews import userViews 

# Optimize views to have less endpoints
# Have one endpoint do multiple things
urlpatterns = [
    # Homepage
    path('', views.index, name='index'),

    # Testing Output
    path('test/1', views.test1, name='test1'),
    path('test/2', views.test2, name='test2'),
    path('test/3', views.test3, name='test3'),
    
    # Tokens
    path('users/makeToken', userViews.storingCookie, name='StoringCookie'),

    #User Endpoints
    path('users', userViews.getAll, name='getAll'),
    path('users/<int:id>', userViews.getById, name='getById'),
    path('users/changeUser', userViews.changeUserInfo, name='changeUserInfo'),
    path('users/delete', userViews.deleteUser, name='deleteUser'),
    path('users/deleteAll', userViews.deleteAll, name='deleteAll'),
    path('users/register', userViews.registerUser, name='registerUser'),
    path('users/login', userViews.loginUser, name='loginUser'),
    path('users/accessToken', userViews.accessToken, name='accessToken'),
]