'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Carts', {
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
            number: {
                type: Sequelize.INTEGER,
            },
            color: {
                type: Sequelize.TEXT,
            },
            size: {
                type: Sequelize.STRING,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Carts');
    }
};