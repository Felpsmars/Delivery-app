import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from './CartProvider';
import { UserContext } from './UserProvider';

export const SalesContext = createContext();

const SalesProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { cart, cartValue } = useContext(CartContext);
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const { REACT_APP_SERVER } = process.env;

    try {
      await axios.get(`${REACT_APP_SERVER}/sale/${user.id}`, {
        headers: {
          authorization: user.token,
        },
      });
    } catch (e) {
      console.log('Error while fetching sales ', e);
    }
  };

  const postSale = async (details) => {
    const { REACT_APP_SERVER } = process.env;
    try {
      const response = await axios.post(`${REACT_APP_SERVER}/sale`, {
        userId: user.id,
        totalPrice: cartValue,
        products: cart,
        ...details,
      }, {
        headers: {
          authorization: user.token,
        },
      });
      return response.data;
    } catch (e) {
      console.log('Error while creating sale ', e.message);
    }
  };

  useEffect(() => {
    if (user.token) fetchSales();
  }, [user]);

  const value = {
    sales,
    setSales,
    postSale,
  };

  return (
    <SalesContext.Provider value={ value }>
      { children }
    </SalesContext.Provider>
  );
};

SalesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SalesProvider;
