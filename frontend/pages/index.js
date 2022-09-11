import axios from "axios";
import Head from 'next/head'
import Product from '../components/Product'
import { Gallery } from "../styles/Gallery";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ data }) {
  const { products, countProducts} = data;

  const [productsData, setProductsData] = useState(products);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  //const getMoreProducts = async () => { 
  async function getMoreProducts() {
    const res = await axios.get(`https://curiositov3.onrender.com/api/v1/products/?page=${pageNum + 1}`);
    setPageNum(pageNum + 1);
    const data = res.data;
    const {products} = data;
    setProductsData(productsData => [...productsData, ...products])
  }

  useEffect(() => {
    setHasMore(countProducts > productsData.length ? true : false)
  }, [productsData])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if(query.get('success')) {
      console.log('success');
    }
    if(query.get('canceled')) {
      window.history.replaceState(null,null,window.location.pathname)
    }
  }, []);

  return (
    <div >
      <Head>
        <title>Curiositos</title>
        <meta name="description" content="Curiositos Ayacucho Huamanga" />
      </Head>
      <main>
        <Gallery>
        
        <InfiniteScroll
          dataLength={productsData.length}
          next={getMoreProducts}
          hasMore={hasMore}
          loader={<h4>...</h4>}
          className="gallery"
        >
        {productsData.map((product) => (
          <Product key={product.slug} product={product}/>
          ))}
        </InfiniteScroll>

        </Gallery>
      </main>
    </div>
  )
}

export async function getServerSideProps() {

  const res = await axios.get(`${process.env.API_BACKEND}products/`);
  const data = res.data;

  return {
    props: {
      data,
    },
  };
}
