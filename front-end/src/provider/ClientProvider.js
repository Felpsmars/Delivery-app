import React from 'react';
import { Outlet } from 'react-router-dom';
import CartProvider from './CartProvider';
import SalesProvider from './SalesProvider';

const ClientProvider = () => (
  <CartProvider>
    <SalesProvider>
      <Outlet />
    </SalesProvider>
  </CartProvider>
);

export default ClientProvider;
