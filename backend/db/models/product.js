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
    mainIcon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 256]
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
  {});

  // Todo: see if i can get a min, with no max, on len for desc.
  
  // Product.allProducts = async function () {
  //   return await Product.findAll()
  // }

  // Product.newProduct = async function ({ ownerId, productTitle, mainImage, mainImageAlt, description }) {
  //   const newProduct = await Product.create({
  //     ownerId, productTitle, mainImage, mainImageAlt, description
  //   });
  //   return await newProduct;
  // };

  // Do I even need any of ^ these to be in the model?
  // I think I can do everything in the api routes by importing the model...

  Product.associate = function(models) {
    Product.belongsTo(models.User, { foreignKey: 'ownerId' })
    Product.hasMany(models.Discussion, { foreignKey: 'productId', onDelete: 'cascade', hooks: true })
    Product.hasMany(models.ProductTag, { foreignKey: 'productId', onDelete: 'cascade', hooks: true })
    Product.belongsToMany(models.Tag, {
      through: 'ProductTag', // model (singular) of join table
      otherKey: 'tagId', // Key that points to the other entity
      foreignKey: 'productId', // Key that points to this entity
      onDelete: 'cascade',
      hooks: true // The beforeDestroy and afterDestroy hooks will only be called on associations that have onDelete: 'CASCADE' and hooks: true
    })
  };

  return Product;
};