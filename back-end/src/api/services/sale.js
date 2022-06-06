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

const create = async (data, products) => {
  const t = await db.sequelize.transaction();

  try {
    const { dataValues: sale } = await Sale.create({ ...data });
    await createProductAssociation(sale.id, products);

    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

module.exports = { getAll, create };