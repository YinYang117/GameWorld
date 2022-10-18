'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = "my-game-world-site";
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      firstname: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
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
    },  options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users', options);
  }
};
