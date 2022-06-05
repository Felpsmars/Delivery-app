import React, { useState } from 'react';

const productCard = ({ obj }) => {
  const [quantity, setQuantity] = useState(0);

  const convertPrice = (originalPrice) => (
    originalPrice.replace('.', ',')
  );

  const changeQuantity = (value) => (value >=0 && setQuantity(+value));

  return (
    <div>
      <p data-testid={`customer_products__element-card-price-${obj.id}`}>
        {convertPrice(obj.price)}
      </p>
      <img
        data-testid={`customer_products__img-card-bg-image-${obj.id}`}
        src={`${obj.urlImage}`}
        alt={`product-image-${obj.id}`}
      />
      <p data-testid={`customer_products__element-card-title-${obj.id}`}>
        {obj.name}
      </p>
      <div>
        <button
          type="button"
          data-testid={`customer_products__button-card-rm-item-${obj.id}`}
          onClick={ () => changeQuantity(quantity - 1) }
        >
          -
        </button>
        <input
          type="number"
          data-testid={`customer_products__input-card-quantity-${obj.id}`}
          value={quantity}
          onChange={({ target: { value } }) => changeQuantity(value)}
        />
        <button
          type="button"
          data-testid={`customer_products__button-card-add-item-${obj.id}`}
          onClick={ () => changeQuantity(quantity + 1) }
        >
          +
        </button>
      </div>
    </div>
  );
};

export default productCard;
