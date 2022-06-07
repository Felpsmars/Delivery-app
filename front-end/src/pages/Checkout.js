import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';
import { CartContext } from '../provider/CartProvider';
import Navbar from '../components/Navbar';
import TotalBox from '../components/TotalBox';

function Checkout() {
  const { user, isUserValid, updateUser } = useContext(UserContext);
  const { cart, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const validateUser = async () => {
    if (isUserValid === false) {
      updateUser();
      navigate('/');
    }
  };

  useEffect(() => {
    validateUser();
  }, [user, validateUser]);

  return (
    <div id="orders-box">
      <div id="navbar"><Navbar pageName="Produtos" /></div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>

          {cart.map((e, i) => (
            <tr
              key={ e.id }
              data-testid={ `element-order-table-name-${e.id}` }
            >
              <td>{i + 1}</td>
              <td>{e.name}</td>
              <td>{e.quantity}</td>
              <td>{e.price}</td>
              <td>{e.quantity * e.price}</td>
              <td>
                <button
                  onClick={ () => removeItem(e.id) }
                  type="submit"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="total-box"><TotalBox /></div>
    </div>

  );
}

export default Checkout;
