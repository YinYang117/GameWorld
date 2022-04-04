'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};