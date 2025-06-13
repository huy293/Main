'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    return queryInterface.bulkInsert('Users', [
      {
        username: 'moderator1',
        email: 'moderator1@example.com',
        password: hashedPassword,
        role: 'moderator',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'moderator2',
        email: 'moderator2@example.com',
        password: hashedPassword,
        role: 'moderator',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: hashedPassword,
        role: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: hashedPassword,
        role: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
}; 