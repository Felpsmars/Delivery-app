import React, { useContext } from 'react';
import { CartContext } from '../provider/CartProvider';
import Navbar from '../components/Navbar';
import CheckoutFinish from '../components/CheckoutFinish';
import ProductTable from '../components/ProductTable';

function Checkout() {
  const { cart, cartValueComma } = useContext(CartContext);

  return (
    <>
      <Navbar pageName="Produtos" />
      <h2>Finalizar Pedido</h2>
      <div>
        <ProductTable products={ cart } isCart />
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
