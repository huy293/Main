'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Payment.belongsTo(models.User, { foreignKey: 'userID' });
        }
    }
    Payment.init({
        list_cart: DataTypes.STRING,
        payment_method: DataTypes.TEXT,
        code_trade: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Payment',
        timestamps: false,
    });
    return Payment;
};