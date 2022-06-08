
const data = {
    foreignKey: 'sale_id',
    otherKey: 'product_d',
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
    const salesProducts = sequelize.define('sales_products', {
        quantity: {
            type: DataTypes.INTEGER,
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