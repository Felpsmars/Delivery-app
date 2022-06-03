const { Product } = require('../../database/models');
const ERRORS = require('../utils/error');

const getAll = async () => (
  Product.findAll()
);

const getById = async (id) => {
  const response = await Product.findByPk(id);
  if (!response) throw (ERRORS.PRODUCT.NOT_FOUND);

  return response;
};

module.exports = { getAll, getById };