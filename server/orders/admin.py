from django.contrib import admin
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'phone', 'products']
    search_fields = ['name', 'phone']
    
    class meta:                                                            
        model = Order
