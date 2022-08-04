import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../utils/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    runFireworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for your receipt.</p>
        <p className="description">
          If you have any questions, please email:
          <a href="mailto:chelseg14@gmail.com" className="email">
            Deevoe&apos;s email
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </section>
  );
};
export default Success;
