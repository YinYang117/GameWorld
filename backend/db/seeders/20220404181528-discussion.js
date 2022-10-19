'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = "my-game-world-site";
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Discussions";
    return queryInterface.bulkInsert(options, [
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
    return queryInterface.bulkDelete(options);
  }
};
