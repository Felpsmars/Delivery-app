const { INTEGER } = require('sequelize');

const data = {
    foreignKey: 'sale_id',
    otherKey: 'product_id',
    through: 'salesProducts',
    as: 'product'
};

const data2 = {
    foreignKey: 'product_id',
    otherKey: 'sale_id',
    through: 'salesProducts',
    as: 'sale'
};

module.exports = (sequelize, DataTypes) => {
    const salesProducts = sequelize.define('SalesProducts', {
        saleId: {
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          productId: {
            type: INTEGER,
            primaryKey: true,
            allowNull: false,
          },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'sales_products',
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