'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    return queryInterface.bulkInsert('Users', [
      {
        fullname: 'Admin',
        email: 'luuhuy.290303@gmail.com',
        password: '123',
        age: 21,
        phone: '0986648481',
        gender: true,
        address: '19 Nguyễn Hữu Thọ, Quận 7',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: 'User',
        email: 'coming293@gmail.com',
        password: '123',
        age: 21,
        phone: '0986648481',
        gender: true,
        address: '19 Nguyễn Hữu Thọ - Quận 7',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    };
  }
};
