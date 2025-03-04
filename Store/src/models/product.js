'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.hasMany(models.Comment, { foreignKey: 'productID' });

            Product.belongsToMany(models.User, {
                through: models.Cart,
                foreignKey: 'productID'
            });
            Product.belongsToMany(models.User, {
                through: models.Love,
                foreignKey: 'productID'
            });
            Product.belongsToMany(models.User, {
                through: models.History,
                foreignKey: 'productID'
            });
        }
    }
    Product.init({
        nameProduct: DataTypes.TEXT,
        categories: DataTypes.TEXT,
        tags: DataTypes.TEXT,
        brands: DataTypes.TEXT,
        color: DataTypes.TEXT,
        size: DataTypes.STRING,
        description: DataTypes.TEXT,
        overview: DataTypes.TEXT,
        information: DataTypes.TEXT,
        img: DataTypes.STRING,
        price: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: false,
    });
    return Product;
};