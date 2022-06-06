const data = { foreignKey: 'sale_id',
otherKey: 'product_id', 
through: 'salesProducts', 
as: 'products' };

const data2 = { foreignKey: 'productId', 
otherKey: 'sale_id', 
through: 'salesProducts', 
as: 'sales' };

module.exports = (sequelize) => {
    const salesProducts = sequelize.define('salesProducts', {
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
        models.Sale.belongsToMany(
            models.Product, 
        data,
        );
   models.Product.belongsToMany(
            models.Sale, 
            data2,
        );
        };
return salesProducts;
    };