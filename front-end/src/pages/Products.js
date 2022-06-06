import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../provider/UserProvider';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, validateUser: isUserValid, updateUser } = useContext(UserContext);
  const { REACT_APP_SERVER } = process.env;

  const fetchProducts = async () => {
    const result = await axios.get(`${REACT_APP_SERVER}/products`, {
      headers: {
        Authorization: user.token,
      },
    });
    setProducts(result.data);
  };

  const validateUser = async () => {
    const validation = await isUserValid();
    if (!validation) {
      updateUser();
      navigate('/');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) fetchProducts();
    validateUser();
  }, [fetchProducts, user, validateUser]);

  return (
    <div>
      {
        isLoading ? (
          <p>Aguarde um momento...</p>
        ) : (
          <>
            <Navbar pageName="Produtos" />
            {
              products.map((prod, idx) => (
                <ProductCard
                  key={ `product-card-${idx}` }
                  obj={ prod }
                />))
            }
          </>
        )
      }
    </div>
  );
};

export default Products;
