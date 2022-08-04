import { client, urlFor } from "../../sanity-library/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ products, product }) => {
  // destructure the product object
  const { name, price, image, details } = product;
  const [index, setIndex] = useState(0);
  const { decreaseQty, increaseQty, quantity, onAddItem, setShowCart } =
    useStateContext();

  //   console.log(product)
  //   console.log(totalQuantity);

  const handleBuyNow = () => {
    onAddItem(product, quantity);
    setShowCart(true);
  };

  return (
    <section>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {/* eslint-disable-next-line  */}
            <img
              src={urlFor(image && image[index])}
              alt="headphone "
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image.map((item, i) => (
              //  eslint-disable-next-line
              <img
                src={urlFor(item)}
                alt="headphone"
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAddItem(product, quantity)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item, index) => (
              <Product key={index} product={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
  //get a single product by slug
  const product = await client.fetch(
    `*[_type == "product" && slug.current == '${slug}'][0] `
  );

  // get all products
  const products = await client.fetch(`*[_type == "product"]`);

  return {
    props: {
      products,
      product,
    },

    revalidate: 60, //revalidate for 60 seconds
  };
};

export const getStaticPaths = async () => {
  const products = await client.fetch(`*[_type == "product"]{
        slug{
            current
        }

    }`);
  // above, we are fetching all the products slug from the database (sanity.io)

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  })); // we are mapping the slug to the path

  return {
    paths,
    fallback: "blocking",
  };
};
