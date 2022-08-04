import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import product from "../saninty-ecommerce-tut/schemas/product";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);

  let foundProduct;
  let index;

  const onAddItem = (product, qty) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * qty);
    setTotalQuantity((prevTotalQty) => prevTotalQty + qty);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + qty,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = qty;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const onRemove = (product) => {
    const updatedCartItems = cartItems.filter((cartProduct) => {
      return cartProduct._id !== product._id;
    });

    setCartItems(updatedCartItems);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
    setTotalQuantity((prevTotalQty) => prevTotalQty - product.quantity);
    toast.success(`${product.name} removed from cart`);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "increment") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantity((prev) => prev + 1);
    } else if (value === "decrement") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantity((prev) => prev - 1);
      }
    }
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) return 1; // we dont want 0 quantity, 1 must b ethe least.

      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantity,
        setTotalQuantity,
        quantity,
        increaseQty,
        decreaseQty,
        onAddItem,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
