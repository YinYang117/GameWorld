'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = "my-game-world-site";
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      productTitle: {
        type: Sequelize.STRING(40)
      },
      mainIcon: {
        type: Sequelize.STRING(256)
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products', options);
  }
};
