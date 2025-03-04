'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      age: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      address: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      status_discount: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      role: {
        defaultValue: "user",
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};