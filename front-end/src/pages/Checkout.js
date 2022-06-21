import React, { useContext } from 'react';
import { CartContext } from '../provider/CartProvider';
import Navbar from '../components/Navbar';
import CheckoutFinish from '../components/CheckoutFinish';
import ProductTable from '../components/ProductTable';
import style from './style/Checkout.module.css';

function Checkout() {
  const { cart } = useContext(CartContext);

  return (
    <>
      <Navbar pageName="Produtos" />
      <div className={ style.checkoutContainer }>
        <h2>Finalizar Pedido</h2>
        <ProductTable products={ cart } isCart />
        <h2>Detalhes e Endereço para Entrega</h2>
        <CheckoutFinish />
      </div>
    </>
  );
}

export default Checkout;
