import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../provider/CartProvider';
import style from './style/ProductTable.module.css';

const ProductTable = ({ isCart, products }) => {
  const { removeItem, cartValueComma } = useContext(CartContext);

  const convertNumberToPrice = (number) => {
    const numberToConvert = +number;
    return `R$ ${numberToConvert.toFixed(2).split('.').join(',')}`;
  };

  return (
    <div className={ style.productTableContainer }>
      <table className={ style.productTable }>
        <thead className={ style.productTableHeader }>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody className={ style.productTableBody }>
          { products.map((e, i) => (
            <tr
              key={ `cart-product-${i}` }
              data-testid={ `element-order-table-name-${i}` }
              className={ style.productItem }
            >
              <td
                data-testid={ isCart
                  ? `customer_checkout__element-order-table-item-number-${i}`
                  : `customer_order_details__element-order-table-item-number-${i}` }
                className={ style.productItemNumber }
              >
                {i + 1}
              </td>
              <td
                data-testid={ isCart
                  ? `customer_checkout__element-order-table-name-${i}`
                  : `customer_order_details__element-order-table-name-${i}` }
                className={ style.productItemDescription }
              >
                {e.name}
              </td>
              <td
                data-testid={ isCart
                  ? `customer_checkout__element-order-table-quantity-${i}`
                  : `customer_order_details__element-order-table-quantity-${i}` }
                className={ style.productItemQuantity }
              >
                {e.quantity}
              </td>
              <td
                data-testid={ isCart
                  ? `customer_checkout__element-order-table-unit-price-${i}`
                  : `customer_order_details__element-order-table-sub-total-${i}` }
                className={ style.productItemPrice }
              >
                { convertNumberToPrice(e.price) }
              </td>
              <td
                data-testid={ isCart
                  ? `customer_checkout__element-order-table-sub-total-${i}`
                  : `customer_order_details__element-order-total-price-${i}` }
                className={ style.productItemSubtotal }
              >
                { convertNumberToPrice(e.quantity * e.price) }
              </td>
              {
                isCart && (
                  <td
                    className={ style.productItemRemoveButton }
                  >
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
      <div className={ style.tableTotalWrapper }>
        <span>Total: R$</span>
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {cartValueComma}
        </span>
      </div>
    </div>
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
