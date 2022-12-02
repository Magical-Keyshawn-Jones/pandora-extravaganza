from django.urls import path
from . import views 

urlpatterns = [
    # Homepage
    path('', views.index, name='index'),

    # Testing Output
    path('test/1', views.test1, name='test1'),
    path('test/2', views.test2, name='test2'),
    path('test/3', views.test3, name='test3'),
]