import React from 'react';

const productCard = ({ obj }) => (
  <div>
    <p data-testid={ `customer_products__element-card-price-${obj.id}` }>
      {obj.price}
    </p>
    <img
      data-testid={ `customer_products__img-card-bg-image-${obj.id}` }
      src={ `${obj.urlImage}` }
      alt={ `product-image-${obj.id}` }
    />
    <p data-testid={ `customer_products__element-card-title-${obj.id}` }>
      {obj.name}
    </p>
    <div>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${obj.id}` }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${obj.id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${obj.id}` }
      >
        +
      </button>
    </div>
  </div>
);

export default productCard;
