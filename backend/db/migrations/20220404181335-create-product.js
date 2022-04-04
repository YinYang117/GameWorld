'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerID: {
        type: Sequelize.INTEGER
      },
      productTitle: {
        type: Sequelize.STRING(40)
      },
      mainImage: {
        type: Sequelize.STRING(256)
      },
      mainImageAlt: {
        type: Sequelize.STRING(256)
      },
      description: {
        type: Sequelize.STRING(512)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};