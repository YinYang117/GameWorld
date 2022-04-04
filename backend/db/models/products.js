'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    ownerID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    mainImageAlt: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};