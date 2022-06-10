import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import OrderHeader from '../components/OrderHeader';
import ProductTable from '../components/ProductTable';
import { SalesContext } from '../provider/SalesProvider';

const Order = () => {
  const { id: saleId } = useParams();
  const { sales } = useContext(SalesContext);
  const [sale, setSale] = useState({});

  useEffect(() => {
    if (sales.length) {
      const contextSale = sales.find(({ id }) => id === +saleId);
      if (contextSale) setSale(contextSale);
    }
  }, [sales, saleId]);

  return (
    <>
      <Navbar />
      <div>
        <h1>Detalhe do Pedido</h1>
        <OrderHeader sale={ sale } />
        {
          sale.products && (
            <ProductTable products={ sale.products } isCart={ false } />
          )
        }
        <div>
          Total: R$
          <span data-testid="customer_order_details__element-order-total-price">
            {sale.totalPrice && String(sale.totalPrice).split('.').join(',')}
          </span>
        </div>
      </div>
    </>
  );
};

export default Order;
