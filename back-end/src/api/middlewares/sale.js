const saleSchema = require('../schemas/sale');

const validateCreate = async (req, res, next) => {
  const { userId, sellerId, totalPrice, products, deliveryAddress, deliveryNumber } = req.body;
  const payload = await saleSchema.create
    .validateAsync({ userId, sellerId, totalPrice, products, deliveryAddress, deliveryNumber });
  res.locals = { ...payload };
  
  return next();
};

module.exports = { validateCreate };