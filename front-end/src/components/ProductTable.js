import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../provider/CartProvider';

const ProductTable = ({ isCart, products }) => {
  const { removeItem } = useContext(CartContext);

  const convertNumberToPrice = (number) => {
    const numberToConvert = +number;
    return `R$ ${numberToConvert.toFixed(2).split('.').join(',')}`;
  };

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
        { products.map((e, i) => (
          <tr
            key={ `cart-product-${i}` }
            data-testid={ `element-order-table-name-${i}` }
          >
            <td
              data-testid={ isCart
                ? `customer_checkout__element-order-table-item-number-${i}`
                : `customer_order_details__element-order-table-item-number-${i}` }
            >
              {i + 1}
            </td>
            <td
              data-testid={ isCart
                ? `customer_checkout__element-order-table-name-${i}`
                : `customer_order_details__element-order-table-name-${i}` }
            >
              {e.name}
            </td>
            <td
              data-testid={ isCart
                ? `customer_checkout__element-order-table-quantity-${i}`
                : `customer_order_details__element-order-table-quantity-${i}` }
            >
              {e.quantity}
            </td>
            <td
              data-testid={ isCart
                ? `customer_checkout__element-order-table-unit-price-${i}`
                : `customer_order_details__element-order-table-sub-total-${i}` }
            >
              { convertNumberToPrice(e.price) }
            </td>
            <td
              data-testid={ isCart
                ? `customer_checkout__element-order-table-sub-total-${i}`
                : `customer_order_details__element-order-total-price-${i}` }
            >
              { convertNumberToPrice(e.quantity * e.price) }
            </td>
            {
              isCart && (
                <td>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${i}`
                    }
                    onClick={ () => removeItem(e.id) }
                    type="submit"
                  >
                    Remover
                  </button>
                </td>
              )
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  isCart: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ).isRequired,
};

export default ProductTable;
