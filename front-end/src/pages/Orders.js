import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { SalesContext } from '../provider/SalesProvider';
import { UserContext } from '../provider/UserProvider';
import style from './style/Orders.module.css';

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
      <div className={ style.orderContainer }>
        { sales.map((sale) => (
          <button
            type="button"
            className={ style.orderButton }
            key={ `sale-card-${sale.id}` }
            onClick={ () => navigate(`/${user.role}/orders/${sale.id}`) }
          >
            <p className={ style.orderNumber }>
              Pedido
              <span>
                000
                <span data-testid={ `${user.role}_orders__element-order-id-${sale.id}` }>
                  {sale.id}
                </span>
              </span>
            </p>
            <p
              data-testid={ `${user.role}_orders__element-delivery-status-${sale.id}` }
              className={ `${style.orderStatus} ${style[sale.status]}` }
            >
              { sale.status }
            </p>
            <div className={ style.orderDateAndPrice }>
              <span
                data-testid={ `${user.role}_orders__element-order-date-${sale.id}` }
              >
                { sale.saleDate }
              </span>
              <span
                data-testid={ `${user.role}_orders__element-card-price-${sale.id}` }
              >
                { convertNumberToPrice(sale.totalPrice) }
              </span>
            </div>
          </button>
        )) }
      </div>
    </>
  );
};

export default Orders;
