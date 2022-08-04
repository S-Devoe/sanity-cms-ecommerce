import Head from "next/head";
import {
  Product,
  Cart,
  FooterBanner,
  HeroBanner,
  Layout,
  Navbar,
  Footer,
} from "../components";

import { client } from "../sanity-library/client";

export default function Home({ products, bannerData }) {
  console.log(products);
  console.log(bannerData);
  return (
    <section>
      <Head>
        <title>Headphones App</title>
        <meta name="description" content="Practice app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

        <div className="products-heading">
          <h2>Best Selling products</h2>
          <p>Speakers of many variations</p>
        </div>
        <div className="products-container">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>

        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </>
    </section>
  );
}

export const getServerSideProps = async () => {
  const products = await client.fetch(
    `*[_type == "product"] | order(price desc) {
      name,
      slug,
      price,
      image,
      details
    }`
  );

  // the names above are not really compulsory, but they are just for demo purposes

  const bannerData = await client.fetch(`*[_type == "banner"]`);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
