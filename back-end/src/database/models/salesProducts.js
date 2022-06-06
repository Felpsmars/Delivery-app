const data = { foreignKey: 'sale_id',
otherKey: 'product_id', 
through: 'salesProducts', 
as: 'product' };

const data2 = { foreignKey: 'product_id', 
otherKey: 'sale_id', 
through: 'salesProducts', 
as: 'sale' };

module.exports = (sequelize) => {
    const salesProducts = sequelize.define('sales_products', {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
          }
    }, {
        underscored: false,
        timestamps: false,
        tableName: 'salesProducts',
    });

    salesProducts.associate = (models) => {
        models.sale.belongsTo(
            models.products, 
        data,
        );
   models.product.belongsTo(
            models.sales, 
            data2,
        );
        };
return salesProducts;
    };