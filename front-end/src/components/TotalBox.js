import React, { useContext } from 'react';
import { CartContext } from '../provider/CartProvider';

function TotalBox() {
  const { cartValue } = useContext(CartContext);

  return (
    <div
      data-testid="customer_checkout__element-order-total-price"
    >
      Total: R$
      {cartValue}
    </div>
  );
}

export default TotalBox;
