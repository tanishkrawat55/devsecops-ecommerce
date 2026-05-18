import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext();
export const test = "working";
export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] =
    useState(() => {

      const savedCart =
        localStorage.getItem("cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);



  // ADD TO CART
  const addToCart = (product) => {

    setCartItems((prev) => {

      const existing = prev.find(
        (item) =>
          item._id === product._id
      );

      if (existing) {

        return prev.map((item) =>

          item._id === product._id

            ? {
                ...item,
                qty: item.qty + 1
              }

            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1
        }
      ];
    });
  };



  // REMOVE FROM CART
  const removeFromCart = (id) => {

    setCartItems((prev) =>

      prev.filter(
        (item) => item._id !== id
      )
    );
  };



  // UPDATE QUANTITY
  const updateQty = (id, delta) => {

    setCartItems((prev) =>

      prev

        .map((item) =>

          item._id === id

            ? {
                ...item,
                qty: item.qty + delta
              }

            : item
        )

        .filter((item) => item.qty > 0)
    );
  };



  return (

    <CartContext.Provider

      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty
      }}
    >

      {children}

    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);