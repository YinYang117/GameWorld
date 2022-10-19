'use strict';

const bcrypt = require('bcryptjs');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = "my_game_world_site";
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstname: 'Demo',
        lastname: 'Lition',
        title: 'Best Demo User',
        hashedPassword: bcrypt.hashSync('oien')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstname: 'Fake',
        lastname: 'Usera',
        title: 'Grade A Seeder User',
        hashedPassword: bcrypt.hashSync('oien')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstname: 'Faker',
        lastname: 'Userb',
        title: 'Grade B Seeder User',
        hashedPassword: bcrypt.hashSync('oien')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
