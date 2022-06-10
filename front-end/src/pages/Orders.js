import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { SalesContext } from '../provider/SalesProvider';
import { UserContext } from '../provider/UserProvider';

const Orders = () => {
  const { sales } = useContext(SalesContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const convertNumberToPrice = (number) => (
    `R$ ${String(number).split('.').join(',')}`
  );

  return (
    <>
      <Navbar />
      <div>
        { sales.map((sale) => (
          <button
            type="button"
            key={ `sale-card-${sale.id}` }
            onClick={ () => navigate(`/${user.role}/orders/${sale.id}`) }
          >
            <p>
              Pedido
              <span data-testid={ `${user.role}_orders__element-order-id-${sale.id}` }>
                {sale.id}
              </span>
            </p>
            <p
              data-testid={ `${user.role}_orders__element-delivery-status-${sale.id}` }
            >
              { sale.status }
            </p>
            <p
              data-testid={ `${user.role}_orders__element-order-date-${sale.id}` }
            >
              { sale.saleDate }
            </p>
            <p
              data-testid={ `${user.role}_orders__element-card-price-${sale.id}` }
            >
              { convertNumberToPrice(sale.totalPrice) }
            </p>
          </button>
        )) }
      </div>
    </>
  );
};

export default Orders;
