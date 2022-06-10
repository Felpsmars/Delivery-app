import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import CartProvider from './CartProvider';
import SalesProvider from './SalesProvider';
import { UserContext } from './UserProvider';

const ClientProvider = () => {
  const { isUserValid, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateUser = () => {
    if (isUserValid === false) {
      updateUser();
      navigate('/');
    }
  };

  useEffect(() => {
    validateUser();
  }, [isUserValid]);

  return (
    <CartProvider>
      <SalesProvider>
        <Outlet />
      </SalesProvider>
    </CartProvider>
  );
};

export default ClientProvider;
