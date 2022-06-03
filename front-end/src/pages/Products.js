import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { REACT_APP_SERVER } = process.env;
  const { token } = JSON.parse(localStorage.getItem('user'));
  console.log(token);
  const get = async () => {
    const result = await axios.get(`${REACT_APP_SERVER}/products`, {
      headers: {
        Authorization: token,

      },
    });
    setProducts(result.data);
  };
  useEffect(() => {
    get();
  }, [get]);

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
