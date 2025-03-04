'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Comment.belongsTo(models.User, { foreignKey: 'userID' });
            Comment.belongsTo(models.Product, { foreignKey: 'productID' });
        }
    }
    Comment.init({
        vote: DataTypes.DOUBLE,
        feedback: DataTypes.TEXT,
        fullname: DataTypes.TEXT,
        email: DataTypes.STRING,
        files: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comment',
        timestamps: false,
    });
    return Comment;
};