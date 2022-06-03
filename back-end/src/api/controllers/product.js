const productService = require('../services/product');

const getAll = async (_req, res) => {
  const response = await productService.getAll();
  return res.status(200).json(response);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const response = await productService.getById(id);
  return res.status(200).json(response);
};

module.exports = { getAll, getById };