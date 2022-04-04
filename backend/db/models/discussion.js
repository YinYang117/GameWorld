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

  Discussion.newDiscussion = async function ({ userId, productId, message }) {
    const newDiscussion = await Discussion.create({
      userId, productId, message
    });

    return await newDiscussion;
  };


  Discussion.associate = function(models) {
    Discussion.belongsTo(models.User, { foreignKey: 'userId'})
    Discussion.belongsTo(models.Product, { foreignKey: 'productId'})
  };

  return Discussion;
};