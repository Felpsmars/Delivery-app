import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const CartContext = createContext();

const CartProvider = () => {
  const [cart, setCart] = useState([]);

  const cartValue = cart.reduce(
    (acc, cur) => (acc + (cur.price * cur.quantity)), 0,
  ).toFixed(2).split('.').join(',');

  const value = {
    cart,
    setCart,
    cartValue,
  };

  return (
    <CartContext.Provider value={ value }>
      <Outlet />
    </CartContext.Provider>
  );
};

export default CartProvider;
