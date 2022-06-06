import React from 'react';
import Navbar from '../components/Navbar';

function Checkout() {
  const products = [
    {
      id: 1,
      description: "Cerveja Stella 250ml",
      quantity: 3,
      unity_value: 3.80,
    },
    {
      id: 2,
      description: "Cerveja Heikenen 250ml",
      quantity: 9,
      unity_value: 7,
    }
  ];

  return (
    <div>
      <div><Navbar /></div>
      <div>

        <table>
          <thead>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
            <th>Remover</th>
          </thead>
          <tbody>

            {products.map((e) =>
              <tr
                key={e.id}
                data-testeid={`element-order-table-name-${e.id}`}
              >
                <td>{e.id}</td>
                <td>{e.description}</td>
                <td>{e.quantity}</td>
                <td>{e.unity_value}</td>
                <td>{e.quantity * e.unity_value}</td>
                <button type='submit'>Remover</button>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Checkout;
