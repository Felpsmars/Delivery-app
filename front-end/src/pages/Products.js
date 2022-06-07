import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../provider/UserProvider';
import { CartContext } from '../provider/CartProvider';

const Products = () => {
  const navigate = useNavigate();
  const { user, isUserValid } = useContext(UserContext);
  const { cartValue } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const { REACT_APP_SERVER } = process.env;

  const fetchProducts = async () => {
    const result = await axios.get(`${REACT_APP_SERVER}/products`, {
      headers: {
        Authorization: user.token,
      },
    });
    setProducts(result.data);
  };

  const validateUser = () => {
    if (isUserValid === false) {
      navigate('/');
    } else if (isUserValid) {
      fetchProducts();
    }
  };

  useEffect(() => {
    validateUser();
  }, [isUserValid]);

  return (
    <div>
      <Navbar />
      {
        products.map((prod, idx) => (
          <ProductCard
            key={ `product-card-${idx}` }
            obj={ prod }
          />))
      }
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ cartValue === '0,00' }
      >
        Ver Carrinho R$
        <span data-testid="customer_products__checkout-bottom-value">{cartValue}</span>
      </button>
    </div>
  );
};

export default Products;
