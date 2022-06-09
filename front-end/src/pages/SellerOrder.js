import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../provider/UserProvider';
import Navbar from '../components/Navbar'
import OrderCard from '../components/OrderCard'

function SellerOrder() {
  const navigate = useNavigate();
  const { user, isUserValid } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const { REACT_APP_SERVER } = process.env;

  const fetchOrders = async () => {
    const { id } = user;
    try {
      const result = axios.get(`${REACT_APP_SERVER}/sale/seller/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      const response = await result;
      console.log(response.data);
      setOrders(response.data);
      console.log(orders)

    } catch (error) {
      console.log('error fetching orders');
    }
  };

  const validateUser = () => {
    if (isUserValid === false) {
      updateUser();
      navigate('/');
    } else if (isUserValid) {
      fetchOrders();
    }
  };

  useEffect(() => {
    validateUser();
  }, [isUserValid]);

  return (
    <div>
      <Navbar pageName='Pedidos' />
      <div>
        {orders.map(({ id, status, deliveryAddress, deliveryNumber, saleDate, totalPrice}) => (
          <div>
            <div data-testid ={`seller_orders__element-order-id-${id}`}> pedido {id}</div>
            <div data-testid = {`seller_orders__element-delivery-status-${id}`}>{status}</div>
            <div data-testid = {`seller_orders__element-card-address-${id}`}>{deliveryAddress}, {deliveryNumber}</div>
            <div data-testid = {`seller_orders__element-order-date-${id}`}>{saleDate}</div>
            <div data-testid = {`seller_orders__element-card-price-${id}`}>{totalPrice}</div>
          </div>
        ))}



      </div>

    </div>
  )
}

export default SellerOrder
