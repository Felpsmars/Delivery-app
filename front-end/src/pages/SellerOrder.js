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
    const result = await axios.get(`${REACT_APP_SERVER}/sale/seller/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      console.log(result.data);
      setOrders(result.data);
        
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
            <div><Navbar pageName='Pedidos' /></div>
            <div>
                {
                    orders.forEach(element => {
                        <OrderCard order={ element }/>
                    })
                }
            </div>

        </div>
    )
}

export default SellerOrder
