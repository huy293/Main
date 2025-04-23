'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('MovieCrews', {
      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Movies',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      personId: {
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
