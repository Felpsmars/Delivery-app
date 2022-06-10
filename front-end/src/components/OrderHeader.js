import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../provider/UserProvider';
import { SalesContext } from '../provider/SalesProvider';

const OrderHeader = ({ sale }) => {
  const { user, sellers } = useContext(UserContext);
  const { updateSaleStatus } = useContext(SalesContext);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    if (sale && sellers.length) {
      const contextSeller = sellers.find(({ id }) => id === sale.sellerId);
      if (contextSeller) setSeller(contextSeller);
    }
  }, [sale, seller, sellers]);

  const handleUpdateStatus = (status) => (
    updateSaleStatus(sale.id, status)
  );

  const statusButtons = () => (
    user.role === 'customer' ? (
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        onClick={ () => handleUpdateStatus('Entregue') }
        disabled={ sale.status !== 'Em Trânsito' }
      >
        MARCAR COMO ENTREGUE
      </button>
    ) : (
      <>
        <button
          data-testid="seller_order_details__button-preparing-check"
          type="button"
          onClick={ () => handleUpdateStatus('Preparando') }
          disabled={ sale.status !== 'Pendente' }
        >
          PREPARAR PEDIDO
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          type="button"
          onClick={ () => handleUpdateStatus('Em Trânsito') }
          disabled={ sale.status !== 'Preparando' }
        >
          SAIU PARA ENTREGA
        </button>
      </>
    )
  );

  return (
    <div>
      <p>
        Pedido
        <span
          data-testid={
            `${user.role}_order_details__element-order-details-label-order-id`
          }
        >
          {sale.id}
        </span>
      </p>
      {
        user.role === 'customer ' && (
          <p>
            p. Vend:
            <span
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {seller.name}
            </span>
          </p>
        )
      }
      <p
        data-testid={
          `${user.role}_order_details__element-order-details-label-order-date`
        }
      >
        {sale.saleDate}
      </p>
      <p
        data-testid={
          `${user.role}_order_details__element-order-details-label-delivery-status`
        }
      >
        {sale.status}
      </p>
      { statusButtons() }
    </div>
  );
};

OrderHeader.propTypes = {
  sale: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number],
      ))),
    ]),
  ).isRequired,
};

export default OrderHeader;
