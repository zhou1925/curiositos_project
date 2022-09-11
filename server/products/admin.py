from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'price', 'active', 'image_url']
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['price', 'active']
    
    class meta:
        model = Product
