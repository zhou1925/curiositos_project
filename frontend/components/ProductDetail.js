import React from 'react'
import {
    DetailsStyle,
    ProductInfo,
    Quantity,
    Buy,
} from "../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../lib/context";


const ProductDetail = ({ product, error }) => {
  const { increaseQty, decreaseQty, qty, onAdd, setQty } = useStateContext();                                       

    return (
      <DetailsStyle>                                                                                                     
        <img src={product.image_url} alt={product.itle} />                                                                      
        <ProductInfo>                                                                                                    
          <h2>{product.title}</h2>                                                                                       
          <p>{product.description}</p>                                                                                   
          <Quantity>                                                                                                     
            <span>Cantidad</span>                                                                                        
            <button onClick={decreaseQty}>                                                                               
              <AiFillMinusCircle />                                                                                      
            </button>                                                                                                    
            <p>{qty}</p>                                                                                                 
            <button>                                                                                                     
            <AiFillPlusCircle onClick={increaseQty} />                                                                   
            </button>                                                                                                    
          </Quantity>                                                                                                    
          <Buy                                                                                                           
            onClick={() => {                                                                                             
              onAdd(product, qty);                                                              
            }}                                                                                                           
          >                                                                                                              
            Agregar al Carrito                                                                                             
          </Buy>                                                                                                         
        </ProductInfo>                                                                                                   
      </DetailsStyle>                                                                                                    
    );                                                                                                                   
  }
export default ProductDetail;
