'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 40]
      }

    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 256]
      }
    },
    mainImageAlt: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [2, 256]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [40, 512]
      }
    },
  },
  {

  });

  // Todo: see if i can get a min, with no max, on len for desc.

  Product.newProduct = async function ({ world, location, description, price }) {
    const newProduct = await Product.create({
      ownerId, productTitle, mainImage, mainImageAlt, description
    });

    return await newProduct;
  };

  Product.associate = function(models) {
    Product.belongsTo(models.User, { foreignKey: 'ownerId' })
    Product.hasMany(models.Discussion, { foreignKey: 'spotId', onDelete: 'cascade', hooks: true })
    Product.hasMany(models.Tag, {
      through: 'ProductTag', // model (singular) of join table
      otherKey: 'tagId', // Key that points to the other entity
      foreignKey: 'spotId', // Key that points to this entity
      onDelete: 'cascade',
      hooks: true // The beforeDestroy and afterDestroy hooks will only be called on associations that have onDelete: 'CASCADE' and hooks: true
    })
  };

  // Model.associate = function (models) {
  //   Model.belongsTo(models.Answer, { foreignKey: "answerId" });
  // };
// ^ move this to ProductTag. this I believe allows me to query the joins table for this information

  return Product;
};