import React, { useContext, useState } from 'react';
import { CartContext } from '../provider/CartProvider';

const productCard = ({ obj }) => {
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  const convertPrice = (originalPrice) => (
    originalPrice.replace('.', ',')
  );

  // cart = [{ name, price, quantity }]
  const changeQuantity = (value) => {
    if (value >= 0) setQuantity(+value);

    const copyCart = [...cart];
    
    const productInCart = cart.findIndex((p) => p.name === obj.name);
    console.log(productInCart)
    if (productInCart !== -1) {
      copyCart.splice(productInCart, 1);
    }
    setCart([
      ...copyCart,
      { ...obj, price: +obj.price, quantity: value } ]
    );
  };

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
