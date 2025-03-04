'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameProduct: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            categories: {
                type: Sequelize.TEXT
            },
            tags: {
                type: Sequelize.TEXT
            },
            brands: {
                type: Sequelize.TEXT
            },
            color: {
                type: Sequelize.TEXT
            },
            size: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            overview: {
                type: Sequelize.TEXT
            },
            information: {
                type: Sequelize.TEXT
            },
            img: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DOUBLE
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};