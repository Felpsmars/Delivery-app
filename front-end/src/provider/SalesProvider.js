import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { CartContext } from './CartProvider';
import { UserContext } from './UserProvider';

export const SalesContext = createContext();

const SalesProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { cart, cartValue } = useContext(CartContext);
  const [sales, setSales] = useState([]);

  const convertDateToString = (date) => (
    moment(date).format('DD/MM/YYYY')
  );

  const fetchSales = async () => {
    const { REACT_APP_SERVER } = process.env;

    try {
      const response = await axios.get(`${REACT_APP_SERVER}/sale/${user.id}`, {
        headers: {
          authorization: user.token,
        },
      });
      const salesWithFormattedData = response.data.map((sale) => (
        { ...sale, saleDate: convertDateToString(sale.saleDate) }
      ));
      setSales(salesWithFormattedData);
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
      const newSale = response.data;
      newSale.saleDate = convertDateToString(newSale.saleDate);
      setSales([...sales, newSale]);
      return newSale;
    } catch (e) {
      console.log('Error while creating sale ', e.message);
    }
  };

  const updateSaleStatus = async (saleId, status) => {
    const { REACT_APP_SERVER } = process.env;
    try {
      await axios.patch(`${REACT_APP_SERVER}/sale/${saleId}`, {
        status,
      }, {
        headers: {
          authorization: user.token,
        },
      });
      const newSales = sales.reduce((acc, cur) => (
        cur.id === saleId
          ? [...acc, { ...cur, status }]
          : acc
      ), []);
      setSales(newSales);
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
    fetchSales,
    postSale,
    updateSaleStatus,
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
