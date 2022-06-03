const { Product } = require('../../database/models');

const getProducts = async () => {
      const products = await Product.findAll();
      return { code: 200, data: products };
    };
  
 const getProductId = async (id) => {
      const productId = await Product.findByPk(id);
      return { code: 200, data: productId };
    };

    module.exports = { getProductId, getProducts };