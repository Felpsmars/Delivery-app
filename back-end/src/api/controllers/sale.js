const saleService = require('../services/sale');

const create = async (_req, res) => {
  const payload = res.locals;
  const response = await saleService.create(payload);
  return res.status(201).json({ ...response });
};

const getAll = async (req, res) => {
  const { userId } = req.params;
  const response = await saleService.getAll(userId);
  return res.status(200).json(response);
};

const getBySeller = async (req, res) => {
  const { sellerId } = req.params;
  const response = await saleService.getBySeller(sellerId);
  return res.status(200).json(response);
};

const saleDelivered = async (req, res) => {
  const { id } = req.params;
  await saleService.saleDelivered(id);
  return res.status(200).json({ message: 'Status: delivered' });
};

module.exports = { getAll, create, saleDelivered, getBySeller };