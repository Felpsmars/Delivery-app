const { productList } = require('./product');

const validSale = {
  userId: 3,
  sellerId: 2,
  totalPrice: 150.50,
  products: [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 3 },
  ],
  deliveryAddress: 'Rua Teste',
  deliveryNumber: 187,
};

const invalidSale = {
  userId: 3,
  sellerId: 2,
  totalPrice: 150.50,
  deliveryAddress: 'Rua Teste',
  deliveryNumber: 187,
};

const saleMock = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: 150.50,
  deliveryAddress: 'Rua Teste',
  deliveryNumber: 187,
  saleDate: '2022-06-13 18:27:19',
  status: 'Pendente'
};

const databaseSale = [{
  dataValues: {
    ...saleMock,
  },
  ...saleMock,
}];

const databaseSalesProducts = [
  {
    id: 1,
    saleId: 1,
    productId: 1,
    quantity: 2,
  },
  {
    id: 2,
    saleId: 1,
    productId: 2,
    quantity: 3,
  },
];

const getAllResponse = [{
  ...databaseSale.dataValues,
  products: productList.map((p, idx) => ({
    ...p.dataValues,
    quantity: databaseSalesProducts[idx].quantity,
  }))
}];

module.exports = {
  validSale,
  invalidSale,
  databaseSale,
  databaseSalesProducts,
  getAllResponse,
};