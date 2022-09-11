from json import loads as json_load
import stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
                                    

adjustable_quantity = {'enabled': True,'minimum': 1,'maximum': 10}
    
stripe.api_key = ""

line_item_cart = []

def load_cart(cart):
    """
    load cart items from the Frontend
    """
    cart = json_load(cart)
    line_item_cart.clear()

    for item in cart:
        title, image_url, quantity = item['title'], item['image_url'], item['quantity']
        price = float(item['price']) * 100
        price = int(price)

        line_item_cart.append(
            {'price_data': 
                {'currency': 'pen', 'unit_amount': price, 'product_data': 
                    { 'name': title, 'images': [image_url]}
                },
            'quantity': quantity, 'adjustable_quantity':adjustable_quantity
            }
        )


@api_view(['POST'])
def create_checkout_session(request):
    """
    create checkout session stripe
    return url session to the frontend
    """
    try:
        cart = request.data.get('cart')
        load_cart(cart)
    except Exception as e:
        return Response({'error': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        checkout_session = stripe.checkout.Session.create(
            line_items = line_item_cart,
            mode='payment',
            success_url='http://127.0.0.1:3000/?success=true',
            cancel_url='http://127.0.0.1:3000/?canceled=true',
            payment_method_types =['card'],
            locale='es',
            shipping_address_collection={
                'allowed_countries': ['PE'],
            },
            phone_number_collection={
                'enabled': True,
            },
        )
        return Response({"url": checkout_session.url}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
