import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../provider/UserProvider';

const Products = () => {
  const { REACT_APP_SERVER } = process.env;
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  const fetchProducts = async () => {
    const result = await axios.get(`${REACT_APP_SERVER}/products`, {
      headers: {
        Authorization: user.token,
      },
    });
    setProducts(result.data);
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  return (
    <div>
      <Navbar />
      {
        products.length === 0 ? (
          <p>Aguarde um momento...</p>
        ) : products.map((prod, idx) => (
          <ProductCard
            key={ idx }
            obj={ prod }
          />))
      }
    </div>
  );
};

export default Products;
