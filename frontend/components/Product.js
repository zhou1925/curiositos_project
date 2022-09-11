import { ProductStyles } from "../styles/ProductStyle";
import Link from "next/link";

const Product = ({ product }) => {
    const { title, price, image_url, slug } = product;

    return (
        <ProductStyles>
          <Link href={`/products/${slug}`}>
            <div>
              <img src={image_url} alt={title} />
            </div>
          </Link>
          <h2>{title} </h2>
          <h3>S/{price}</h3>
        </ProductStyles>
      );
}

export default Product
