'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Payments', {
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
            list_cart: {
                type: Sequelize.STRING
            },
            payment_method: {
                type: Sequelize.TEXT
            },
            code_trade: {
                type: Sequelize.STRING
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Payments');
    }
};