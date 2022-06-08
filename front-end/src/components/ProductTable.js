import React, { useContext } from 'react';
import { CartContext } from '../provider/CartProvider';

const ProductTable = () => {
  const { cart, removeItem } = useContext(CartContext);

  const convertNumberToPrice = (number) => (
    `R$ ${number.toFixed(2).split('.').join(',')}`
  );

  return (
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
            key={ `cart-product-${e.id}` }
            data-testid={ `element-order-table-name-${e.id}` }
          >
            <td data-testid={ `customer_checkout__element-order-table-item-number-${i}` }>
              {i + 1}
            </td>
            <td data-testid={ `customer_checkout__element-order-table-name-${i}` }>
              {e.name}
            </td>
            <td data-testid={ `customer_checkout__element-order-table-quantity-${i}` }>
              {e.quantity}
            </td>
            <td data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }>
              { convertNumberToPrice(e.price) }
            </td>
            <td data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }>
              { convertNumberToPrice(e.quantity * e.price) }
            </td>
            <td>
              <button
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
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
  );
};

export default ProductTable;
