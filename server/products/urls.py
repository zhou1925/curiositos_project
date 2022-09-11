from django.urls import path
                                                                                             
from .views import getListProducts, getProduct
                                    
urlpatterns = [                                
    path("", getListProducts),                                
    path("<str:slug>/", getProduct),                                
]
