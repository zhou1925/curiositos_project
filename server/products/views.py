from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from .serializers import ProductSerializer
from .models import Product

@api_view(['GET'])
def getProduct(request, slug):
    """
    get product by slug
    """
    product = get_object_or_404(Product, slug=slug)
    serializer = ProductSerializer(product, many=False)

    return Response({"product": serializer.data})


@api_view(['GET'])
def getListProducts(request):
    """
    Return all active products
    """
    products = Product.objects.filter(active=True)
    
    countProducts = products.count()

    paginator = PageNumberPagination()
    paginator.page_size = 10

    queryset = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(queryset, many=True)

    return Response({"products": serializer.data, "countProducts":countProducts})

