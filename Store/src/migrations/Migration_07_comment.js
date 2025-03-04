'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            productID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Products',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            vote: {
                type: Sequelize.DOUBLE
            },
            feedback: {
                type: Sequelize.TEXT
            },
            fullname: {
                type: Sequelize.TEXT
            },
            email: {
                type: Sequelize.STRING
            },
            files: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Comments');
    }
};