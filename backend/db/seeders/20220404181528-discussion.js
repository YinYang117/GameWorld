'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discussions', [
      {
        userId: 1,
        productId: 1,
        message: "This is a discussion on the first product that I have, from the first user!"
      },
      {
        userId: 2,
        productId: 1,
        message: "This is a discussion on the first product that I have, from the 2 user!"
      },
      {
        userId: 1,
        productId: 2,
        message: "This is a discussion on the 2 product that I have, from the first user!"
      },
      {
        userId: 3,
        productId: 3,
        message: "This is a discussion on the 3 product that I have, from the 3 user!"
      },
      {
        userId: 1,
        productId: 3,
        message: "This is a discussion on the 3 product that I have, from the first user!"
      },
      {
        userId: 3,
        productId: 1,
        message: "This is a discussion on the first product that I have, from the 3 user!"
      },
      {
        userId: 2,
        productId: 1,
        message: "This is a discussion on the first product that I have, from the 2 user!"
      },
      {
        userId: 1,
        productId: 2,
        message: "This is a discussion on the 2 product that I have, from the first user!"
      },
      {
        userId: 2,
        productId: 2,
        message: "This is a discussion on the 2 product that I have, from the 2 user!"
      },



    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discussions', null, {});
  }
};
