'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTag = sequelize.define('ProductTag', {
    productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});


  ProductTag.associate = function(models) {
    ProductTag.belongsTo(models.Product,  { foreignKey: 'productId' })
    // I believe allows me to query the joins table for this information
  };

  return ProductTag;
};