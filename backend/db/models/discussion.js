'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    ownerID: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  Discussion.associate = function(models) {
    // associations can be defined here
  };
  return Discussion;
};