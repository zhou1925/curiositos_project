from json import loads as json_load
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order


def load_products(cart):
    """
    return products from cart
    """
    cart = json_load(cart)
    products = ""
    for item in cart:
        title, quantity = item['title'], item['quantity']
        text = f"(x{quantity}){title},"
        products += text
    return products

@api_view(['POST'])
def createOrder(request):
    """ create order model """
    try:
        name = request.data.get('name')
        phone = request.data.get('phone')
        cart = request.data.get('cart')

        products = load_products(cart)

        order = Order.objects.create(
            name=name,
            phone=phone,
            products=products
        )
        order.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response({'error': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
