import Link from "next/link";
import { urlFor } from "../sanity-library/client";

const Product = ({ product }) => {
  // console.log({...product});
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          {/* eslint-disable-next-line  */}
          <img
            src={urlFor(product.image && product.image[0])}
            alt="product image"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};
export default Product;
