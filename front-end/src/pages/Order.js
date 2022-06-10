import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductTable from '../components/ProductTable';
import { SalesContext } from '../provider/SalesProvider';
import { UserContext } from '../provider/UserProvider';

const Order = () => {
  const { id: saleId } = useParams();
  const { sellers } = useContext(UserContext);
  const { sales, updateSaleStatus } = useContext(SalesContext);
  const [sale, setSale] = useState({});
  const [seller, setSeller] = useState({});

  const handleUpdateStatus = () => (
    updateSaleStatus(sale.id, 'Entregue')
  );

  useEffect(() => {
    if (sales.length) {
      const contextSale = sales.find(({ id }) => id === +saleId);
      if (contextSale) setSale(contextSale);
    }
  }, [sales, saleId]);

  useEffect(() => {
    if (sale && sellers.length) {
      const contextSeller = sellers.find(({ id }) => id === sale.sellerId);
      if (contextSeller) setSeller(contextSeller);
    }
  }, [sale, seller, sellers]);

  const testIdSt = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <h1>Detalhe do Pedido</h1>
      <div>
        <p>
          Pedido
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { sale.id }
          </span>
        </p>
        <p>
          p. Vend:
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { seller.name }
          </span>
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { sale.saleDate }
        </p>
        <p
          data-testid={ testIdSt }
        >
          { sale.status }
        </p>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          onClick={ handleUpdateStatus }
          disabled
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
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
  );
};

export default Order;
