import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
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
      { children }
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CartProvider;
