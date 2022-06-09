const db = require('../../database/models');

const { Sale, SalesProducts } = db;

const createProductAssociation = async (saleId, products) => (
  Promise.all(products.map(
    ({ id, quantity }) => SalesProducts.create({
      saleId,
      productId: id,
      quantity,
    }),
  ))
);

const getAll = async (userId) => (
  Sale.findAll({ where: { userId } })
);

const getBySeller = async (sellerId) => (
  Sale.findAll({ where: { sellerId } }) 
);

const create = async ({ products, ...data }) => {
  const t = await db.sequelize.transaction();

  try {
    const { dataValues: sale } = await Sale.create({ ...data });
    await createProductAssociation(sale.id, products);
    await t.commit();

    return { ...sale, products };
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const saleDelivered = async (id) => {
   const response = await Sale.update({ status: 'Entregue' }, { where: { id } });
    return response;
  };

module.exports = { getAll, create, saleDelivered, getBySeller }; 