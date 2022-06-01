module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    sellerId: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
    },
    saleDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: 'Sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId', as: 'buys'
    });
  };

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId', as: 'sales'
    });
  };

  return Sale;
};
