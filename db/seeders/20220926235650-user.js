'use strict';
const { USER_TABLE } = require('./../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      USER_TABLE,
      [
        {
          email: 'hbuezoss@gmail.com',
          password: await bcrypt.hash('alcancia..', 10),
          role: 'admin',
          created_at: new Date(),
        },
        {
          email: 'xhepo@hotmail.es',
          password: await bcrypt.hash('alcancia..', 10),
          role: 'editor',
          created_at: new Date(),
        },
        {
          email: 'xhepoldc@gmail.com',
          password: await bcrypt.hash('alcancia..', 10),
          role: 'user',
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
