import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';
import Navbar from '../components/Navbar';

function Checkout() {
  const { user, validateUser: isUserValid, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validateUser = async () => {
    const validation = await isUserValid();
    if (!validation) {
      updateUser();
      navigate('/');
    }
  };

  useEffect(() => {
    validateUser();
  }, [user, validateUser]);

  const products = [
    {
      id: 1,
      description: 'Cerveja Stella 250ml',
      quantity: 3,
      unity_value: 3.80,
    },
    {
      id: 2,
      description: 'Cerveja Heikenen 250ml',
      quantity: 9,
      unity_value: 7,
    },
  ];

  return (
    <div>
      <div><Navbar pageName="Produtos" /></div>
      <div>

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

            {products.map((e) => (<tr
              key={ e.id }
              data-testeid={ `element-order-table-name-${e.id}` }
            >
              <td>{e.id}</td>
              <td>{e.description}</td>
              <td>{e.quantity}</td>
              <td>{e.unity_value}</td>
              <td>{e.quantity * e.unity_value}</td>
              <td>
                <button type="submit">Remover</button>
              </td>
                                  </tr>))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Checkout;
