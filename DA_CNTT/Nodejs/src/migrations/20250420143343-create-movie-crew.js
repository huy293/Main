'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('MovieCrews', {
      seasonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Seasons',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      peopleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'People',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      job: {
        type: Sequelize.STRING,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('MovieCrews');
  }
};
