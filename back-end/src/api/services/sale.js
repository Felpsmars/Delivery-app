const db = require('../../database/models');

const { Sale, SalesProducts, Product } = db;

const createProductAssociation = async (saleId, products) => (
  Promise.all(products.map(
    ({ id, quantity }) => SalesProducts.create({
      saleId,
      productId: id,
      quantity,
    }),
  ))
);

const getProductsBySaleId = async (saleId) => {
  const associations = await SalesProducts.findAll({ where: { saleId } });

  const productPromises = associations.map(async ({ productId, quantity }) => {
    const product = await Product.findOne({ where: { id: productId } });
    return { ...product.dataValues, quantity };
  });

  return Promise.all(productPromises);
};

const getAll = async (userId) => {
  const response = await Sale.findAll({ where: { userId } });

  const salesPromises = response.map(async (sale) => {
    const products = await getProductsBySaleId(sale.id);
    return { ...sale.dataValues, products };
  });

  return Promise.all(salesPromises);
};

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

const updateStatus = async (id, status) => (
  Sale.update(
     { status },
     { where: { id } },
  )
);

module.exports = { getAll, getBySeller, create, updateStatus };
