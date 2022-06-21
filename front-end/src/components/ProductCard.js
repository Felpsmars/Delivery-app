import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../provider/CartProvider';
import style from './style/ProductCard.module.css';

const ProductCard = ({ obj }) => {
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  const convertPrice = (originalPrice) => (
    originalPrice.replace('.', ',')
  );

  const changeQuantity = (value) => {
    const INDEX_NOT_FOUND = -1;
    if (value >= 0) setQuantity(+value);

    const copyCart = [...cart];
    const productInCart = cart.findIndex((p) => p.name === obj.name);

    if (productInCart !== INDEX_NOT_FOUND) {
      copyCart.splice(productInCart, 1);
    }
    setCart([
      ...copyCart,
      { ...obj, price: +obj.price, quantity: value }]);
  };

  return (

    <div className={ `${style.card}` }>
      <div>
        <p
          className={ `${style.price}` }
          data-testid={ `customer_products__element-card-price-${obj.id}` }
        >
          {convertPrice(obj.price)}
        </p>
        <img
          data-testid={ `customer_products__img-card-bg-image-${obj.id}` }
          src={ `${obj.urlImage}` }
          alt={ `product-img-${obj.id}` }
          className={ `${style.cardImage}` }
        />
      </div>

      <p
        data-testid={ `customer_products__element-card-title-${obj.id}` }
        className={ `${style.cardTitle}` }
      >
        {obj.name}
      </p>
      <div className={ `${style.cardButton}` }>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${obj.id}` }
          onClick={ () => changeQuantity(quantity - 1) }
          className={ `${style.button}` }
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${obj.id}` }
          value={ quantity }
          onChange={ ({ target: { value } }) => changeQuantity(value) }
          className={ `${style.cardinput}` }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${obj.id}` }
          className={ `${style.button}` }
          onClick={ () => changeQuantity(quantity + 1) }
        >
          +
        </button>
      </div>
    </div>

  );
};

ProductCard.propTypes = {
  obj: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string],
  )).isRequired,
};

export default ProductCard;
