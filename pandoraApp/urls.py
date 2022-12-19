from django.urls import path
from . import views
from .moreViews import userViews 

urlpatterns = [
    # Homepage
    path('', views.index, name='index'),

    # Testing Output
    path('test/1', views.test1, name='test1'),
    path('test/2', views.test2, name='test2'),
    path('test/3', views.test3, name='test3'),

    #User Endpoints
    path('users', userViews.getAll, name='getAll'),
    path('users/<int:id>', userViews.getById, name='getById'),
    path('users/delete', userViews.deleteUser, name='deleteUser'),
    path('users/deleteAll', userViews.deleteAll, name='deleteAll'),
    path('users/register', userViews.registerUser, name='registerUser'),
    path('users/login', userViews.loginUser, name='loginUser'),
    path('users/accessToken', userViews.accessToken, name='accessToken'),
]