import React from 'react'
import axios from "axios";
import ProductDetail from '../../components/ProductDetail';

export default function ProductDetailsPage({ product, error }) {
  //if (error) return <NotFound />;

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  
  try {

    const res = await axios.get(`${process.env.API_BACKEND}products/${params.slug}/`);
    const product = res.data.product;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      props: {
	      error: JSON.stringify(error),
      }
    };
  }
}
