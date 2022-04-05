'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [
        {
          ownerId: '1',
          productTitle: 'Civilization',
          mainImage: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto,c_pad,dpr_3.0,f_auto,q_auto,w_500/b_rgb:ffffff/v1/ncom/en_US/games/switch/s/sid-meiers-civilization-vi-switch/hero",
          mainImageAlt: "Civ VI",
          description: "Sid Meier's Civilization VI is a turn-based strategy 4X video game developed by Firaxis Games, published by 2K Games, and distributed by Take-Two Interactive.",
        },
        {
          ownerId: '2',
          productTitle: 'The Grid Game',
          mainImage: "http://homeli.co.uk/wp-content/uploads/2014/12/Playing-Dominoes-with-The-Grid-Game-Wooden-Hexagons-by-Victor-Aleman.jpg",
          mainImageAlt: "The Grid Game in action",
          description: "Victor Alemán designed The Grid Game to try and revive the (almost) lost art of table-top pastimes. The game Alemán has conceived is dubbed Mexican Domino, working on a similar premise to regular dominoes but with each piece having 3 sides. These stunning dominoes are handcrafted from different segments of wood and form a visually pleasing array when laid out.",
        },
        {
          ownerId: '3',
          productTitle: 'The Game of Hex',
          mainImage: "https://www.maths.ed.ac.uk/~csangwin/hex/Example5.png",
          mainImageAlt: "The Game of Hex",
          description: "Hex is a connection strategy game for two players.",
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', {}, {});
  }
};
