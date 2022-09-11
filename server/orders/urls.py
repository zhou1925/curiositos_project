from django.urls import path

from .views import createOrder

urlpatterns = [
    path("", createOrder)
]
