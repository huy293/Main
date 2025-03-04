'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Sale, { foreignKey: 'userID' });
      User.hasMany(models.Comment, { foreignKey: 'userID' });
      User.hasMany(models.Payment, { foreignKey: 'userID' });

      User.belongsToMany(models.Product, {
        through: models.Cart,
        foreignKey: 'userID'
      });
      User.belongsToMany(models.Product, {
        through: models.Love,
        foreignKey: 'userID'
      });
      User.belongsToMany(models.Product, {
        through: models.History,
        foreignKey: 'userID'
      });
    }
  }
  User.init({
    fullname: DataTypes.TEXT,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    address: DataTypes.TEXT,
    status_discount: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};