'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      canDeleteMovie: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      canManageComment: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      canViewReport: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      // Thêm các quyền khác nếu cần
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  }
};