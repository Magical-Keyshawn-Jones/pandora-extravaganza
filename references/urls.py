from django.urls import path
from .. import views 
from .pathViews import gameViews, userViews

urlpatterns = [
    # HomePages
    path('', views.index, name='index'),
    path('GamingForum/login/', views.index, name = 'Login'),
    path('KnuckleBones/', views.index, name = 'KnuckleBones'),
    path('TicTacToe/', views.index, name = 'TacTacToe'),
    path('Hangman/', views.index, name = 'Hangman'),
    # Endpoints
    path('game/', gameViews.getGameReviews, name = 'getGameReviews'),
    path('game/create', gameViews.createGameReview, name = 'createGameReviews'),
    # path('json/', views.testingJSON, name='testingJSON'),
    path('user/', userViews.getAll, name = 'getAll'),
    path('user/delete', userViews.deleteUser, name = 'deleteUser'),
    path('user/register', userViews.registerUser, name = 'registerUser'),
    path('user/login', userViews.loginUser, name = 'loginUser')
]