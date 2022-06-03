import productsService from '../services/products';

const getProduct = async (_req, res) => { 
    const response = await productsService.getProducts();
    const { code, data } = response;
    return res.status(code).json(data);
  };

  const getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await productsService.getProductId(id);
      const { code, data } = response;
      return res.status(code).json(data);
    } catch (err) {
      next(err);
    }
};

module.exports = { getProduct, getById };