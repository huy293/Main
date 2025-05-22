'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WatchHistories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      watched_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      episodeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Episodes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WatchHistories');
  }
};
