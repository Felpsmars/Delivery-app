import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';
import { CartContext } from '../provider/CartProvider';
import Navbar from '../components/Navbar';
import CheckoutFinish from '../components/CheckoutFinish';
import ProductTable from '../components/ProductTable';

function Checkout() {
  const { user, isUserValid, updateUser } = useContext(UserContext);
  const { cartValueComma } = useContext(CartContext);
  const navigate = useNavigate();

  const validateUser = async () => {
    if (isUserValid === false) {
      updateUser();
      navigate('/');
    }
  };

  useEffect(() => {
    validateUser();
  }, [user]);

  return (
    <>
      <Navbar pageName="Produtos" />
      <h2>Finalizar Pedido</h2>
      <div>
        <ProductTable />
        <div>
          Total: R$
          <span data-testid="customer_checkout__element-order-total-price">
            {cartValueComma}
          </span>
        </div>
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <CheckoutFinish />
    </>
  );
}

export default Checkout;
