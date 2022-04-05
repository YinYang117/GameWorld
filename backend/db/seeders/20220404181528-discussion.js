'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discussions', [
      {
        userId: 1,
        productId: 1,
        message: "This is a discussion on the first product that I have, from the first user!"
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discussions', null, {});
  }
};
