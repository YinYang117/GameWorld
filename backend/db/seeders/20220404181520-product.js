'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = "my_game_world_site";
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Products";
      return queryInterface.bulkInsert(options, [
        {
          ownerId: '1',
          productTitle: 'Civilization',
          mainIcon: "https://cdn1.epicgames.com/cd14dcaa4f3443f19f7169a980559c62/offer/EGS_SidMeiersCivilizationVI_FiraxisGames_S1-2560x1440-2fcd1c150ac6d8cdc672ae042d2dd179.jpg",
          mainImage: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto,c_pad,dpr_3.0,f_auto,q_auto,w_500/b_rgb:ffffff/v1/ncom/en_US/games/switch/s/sid-meiers-civilization-vi-switch/hero",
          mainImageAlt: "Civ VI",
          description: "Sid Meier's Civilization VI is a turn-based strategy 4X video game developed by Firaxis Games, published by 2K Games, and distributed by Take-Two Interactive.",
        },
        {
          ownerId: '2',
          productTitle: 'The Grid Game',
          mainIcon: "https://cf.geekdo-images.com/2CtvMwMTFsWgnTl2X8CsoA__opengraph_letterbox/img/2wGl5Ux0rd3igBzuSW4CRHaLKfc=/fit-in/1200x630/filters:fill(auto):strip_icc()/pic3287104.jpg",
          mainImage: "https://inspgr.id/app/uploads/2017/03/product-the-grid-game-feature.jpg",
          mainImageAlt: "The Grid Game in action",
          description: "Victor Alemán designed The Grid Game to try and revive the (almost) lost art of table-top pastimes. The game Alemán has conceived is dubbed Mexican Domino, working on a similar premise to regular dominoes but with each piece having 3 sides. These stunning dominoes are handcrafted from different segments of wood and form a visually pleasing array when laid out.",
        },
        {
          ownerId: '3',
          productTitle: 'The Game of Hex',
          mainIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Hex-board-11x11-%282%29.jpg/250px-Hex-board-11x11-%282%29.jpg",
          mainImage: "https://www.maths.ed.ac.uk/~csangwin/hex/Example5.png",
          mainImageAlt: "The Game of Hex",
          description: "Hex is a connection strategy game for two players.",
        },
        {
          ownerId: '1',
          productTitle: 'StickMan',
          mainIcon: "https://img.poki.com/cdn-cgi/image/quality=78,width=204,height=204,fit=cover,f=auto/3b3f4aeacf600fd3910f1c3d513c0636.png",
          mainImage: "https://whatnerd.com/wp-content/uploads/2021/06/best-stickman-stick-figure-mobile-games-android-iphone-featured.jpg",
          mainImageAlt: "Stick Man Game",
          description: "Stickman is actually a whole genre of games based off a classic stick figure!",
        },
        {
          ownerId: '1',
          productTitle: 'StarCraft 2',
          mainIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGbVoKe5DxxumvARiKV7VUYbovVpYLQ1fZFg&usqp=CAU",
          mainImage: "https://cdn.mos.cms.futurecdn.net/7Zc2rbYvHQzz54q8a9dQDg.jpg",
          mainImageAlt: "StarCraft 2",
          description: "StarCraft II is a sequel to the PC based Real Time Strategy game StarCraft: Brood War made by Blizzard Entertainment. It is split into three installments: the base game with the subtitle Wings of Liberty, and two expansion packs, Heart of the Swarm and Legacy of the Void.",
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Products";
    return queryInterface.bulkDelete(options);
  }
};
