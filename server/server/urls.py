from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('grappelli/', include('grappelli.urls')), # grappelli URLS
    path('admin/', admin.site.urls),
    #
    path('api/v1/orders/', include('orders.urls')),
    path('api/v1/products/', include('products.urls')),
    path('api/v1/', include('core.urls')),
]
