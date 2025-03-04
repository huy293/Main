'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sale extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Sale.belongsTo(models.User, { foreignKey: 'userID' });
        }
    }
    Sale.init({
    }, {
        sequelize,
        modelName: 'Sale',
        timestamps: false,
    });
    return Sale;
};