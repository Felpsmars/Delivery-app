import React from 'react';

const productCard = (props) => (
  <div>
    <p data-testid={ `customer_products__element-card-price-${props.obj.id}` }>
      {props.obj.price}
    </p>
    <img
      data-testid={ `customer_products__img-card-bg-image-${props.obj.id}` }
      src={ `${props.obj.urlImage}` }
      alt={ `${props.obj.urlImage}` }
    />
    <p data-testid={ `customer_products__element-card-title-${props.obj.id}` }>
      {props.obj.name}
    </p>
    <div>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${props.obj.id}` }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `customer_products__input-card-quantity-${props.obj.id}` }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${props.obj.id}` }
      >
        +
      </button>
    </div>
  </div>
);

export default productCard;
