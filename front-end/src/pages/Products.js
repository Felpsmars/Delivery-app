import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../provider/UserProvider';
import { CartContext } from '../provider/CartProvider';

const Products = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { cartValue, cartValueComma } = useContext(CartContext);
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

  useEffect(() => {
    if (user.token) {
      fetchProducts();
    }
  }, [fetchProducts, user]);

  return (
    <div>
      <Navbar pageName="Produtos" />
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
        disabled={ cartValue === '0.00' }

      >
        Ver Carrinho R$
        <span data-testid="customer_products__checkout-bottom-value">
          {cartValueComma}
        </span>
      </button>
    </div>
  );
};

export default Products;
