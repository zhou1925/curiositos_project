import {
    CartStyle,
    Card,
    EmptyStyle,
    CartWrapper,
    CardInfo,
    Checkout,
  } from "../styles/CartStyles";
import { Quantity } from "../styles/ProductDetails";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
//Import State
import { useStateContext } from "../lib/context";
import axios from "axios";
import { useRouter } from 'next/router';
import { useState,useEffect } from "react";
  
  export default function Cart() {
    const { cartItems, setShowCart, setTotalPrice, onAdd, setTotalQuantitites, onRemove, totalPrice, setCartItems } = useStateContext();
    const [checkoutLoader, setCheckoutLoader] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
  
    const router = useRouter();

    //Payment
    const submitHandler = async (e) => {
      e.preventDefault();
      
      if(name.trim()==='' || phone.trim()===''){
        window.alert('nombre y telefono es requerido');
        return;
      }
      
      setCheckoutLoader(true);
      const res = await axios.post(
        `https://curiosito.onrender.com/api/v1/orders/`,
        { 
          'cart': JSON.stringify(cartItems),
          'name': name,
          'phone': phone
        }
      )

      if (res.status === 200) {
        setName("");
        setPhone("");
        setShowCart(false);
        setCartItems([]);
        setTotalQuantitites(0);
        setTotalPrice(0.0);
        router.push('/success');
      }
      
      // window.location.replace(res.data.url)
      setCheckoutLoader(false);
    }
  
    return (
      <CartWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCart(false)}
      >
        <CartStyle
          layout
          initial={{ x: "50%" }}
          animate={{ x: 0 }}
          exit={{ x: "50%" }}
          transition={{ type: "tween" }}
          onClick={(e) => e.stopPropagation()}
        >
          {cartItems.length < 1 && (
              <EmptyStyle
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h1>Tu carrito esta vacio.  </h1>
              <FaShoppingCart />
            </EmptyStyle>

          )}
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 } }}
                    key={item.slug}
                >
                  <img src={item.image_url} />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price}</h3>
                    <Quantity>
                      <span>Cantidad</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <p>{item.quantity}</p>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              );
            })}

        <Checkout layout>
          {cartItems.length >= 1 && (
            <div>
              <h3>Subtotal S/{totalPrice}</h3>
              
              <form onSubmit={submitHandler}>

              <div className="inputBox">
                <input 
                  type="text" 
                  placeholder="Ingresa tu nombre" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  title="tu nombre es requerido"
                  required
                  />
              </div>
              
              <div className="inputBox">
                <input 
                  type="text" 
                  placeholder="Numero de telefono" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  title="tu telefono es requerido"
                  required
                  />
              </div>
              <button
                onClick={submitHandler}
                type="submit"
                >
                {checkoutLoader ? "..." :
                "Ordenar"}
              </button>
            </form>
            </div>
          )}
        </Checkout>
          
        </CartStyle>
      </CartWrapper>
    );
  }
  
