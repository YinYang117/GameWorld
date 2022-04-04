'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
  },
  {

  });
  
  Discussion.associate = function(models) {
    Discussion.belongsTo(models.User, { foreignKey: 'userId'})
    Discussion.belongsTo(models.Product, { foreignKey: 'productId'})
  };

  return Discussion;
};