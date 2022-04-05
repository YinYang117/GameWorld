'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    }
  }, {});

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Product, { // might be hasMany??
      through: 'ProductTag', // model (singular) of join table
      otherKey: 'productId', // Key that points to the other entity
      foreignKey: 'tagId', // Key that points to this entity
      onDelete: 'cascade',
      hooks: true // The beforeDestroy and afterDestroy hooks will only be called on associations that have onDelete: 'CASCADE' and hooks: true
    });
  };

  return Tag;
};