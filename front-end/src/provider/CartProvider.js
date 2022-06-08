import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const CartContext = createContext();

const CartProvider = () => {
  const [cart, setCart] = useState([]);

  const cartValue = cart.reduce(
    (acc, cur) => (acc + (cur.price * cur.quantity)), 0,
  ).toFixed(2);

  const cartValueComma = cartValue.split('.').join(',');

  const removeItem = (id) => {
    const newCart = cart.filter((e) => e.id !== id);
    setCart(newCart);
  };

  const value = {
    cart,
    setCart,
    removeItem,
    cartValue,
    cartValueComma,
  };

  return (
    <CartContext.Provider value={ value }>
      <Outlet />
    </CartContext.Provider>
  );
};

export default CartProvider;
