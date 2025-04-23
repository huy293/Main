'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      overview: {
        type: Sequelize.TEXT,
      },
      release_date: {
        type: Sequelize.DATE,
      },
      poster_url: {
        type: Sequelize.STRING,
      },
      backdrop_url: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['movie', 'series'],
        defaultValue: 'movie',
        allowNull: false,
      },
      video_url: {
        type: Sequelize.STRING,
      },
      trailer_url: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['upcoming', 'ongoing', 'completed'],
        defaultValue: 'upcoming',
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      runtime: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};
