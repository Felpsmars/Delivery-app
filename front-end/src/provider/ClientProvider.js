import { Outlet } from 'react-router-dom';
import CartProvider from './CartProvider';
import SalesProvider from './SalesProvider';

const ClientProvider = () => {
  return (
    <CartProvider>
      <SalesProvider>
        <Outlet />
      </SalesProvider>
    </CartProvider>
  );
};

export default ClientProvider;