import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../provider/UserProvider';
import { CartContext } from '../provider/CartProvider';
import { SalesContext } from '../provider/SalesProvider';

const CheckoutFinish = () => {
  const { sellers } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { postSale } = useContext(SalesContext);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    sellerId: undefined,
    deliveryAddress: '',
    deliveryNumber: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setDetails({ ...details, [name]: value });
  };

  const areFieldsValid = (
    cart.length
    && details.deliveryAddress !== ''
    && details.deliveryNumber !== ''
  );

  const handleFinish = async () => {
    const response = await postSale(details);
    if (response) navigate(`/customer/orders/${response.id}`);
  };

  useEffect(() => {
    if (sellers[0]) {
      setDetails((d) => ({ ...d, sellerId: sellers[0].id }));
    }
  }, [sellers]);

  return (
    <div>
      <label htmlFor="sellerId">
        P. Vendedora Responsável
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ handleChange }
          name="sellerId"
          value={ details.sellerId }
        >
          {sellers.map((seller) => (
            <option
              key={ `seller-option-${seller.id}` }
              value={ seller.id }
            >
              {seller.name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
          onChange={ handleChange }
          name="deliveryAddress"
          value={ details.deliveryAddress }
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          data-testid="customer_checkout__input-addressNumber"
          type="text"
          placeholder="198"
          onChange={ handleChange }
          name="deliveryNumber"
          value={ details.deliveryNumber }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleFinish }
        disabled={ !areFieldsValid }
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default CheckoutFinish;
