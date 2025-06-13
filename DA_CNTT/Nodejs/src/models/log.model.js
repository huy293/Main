module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {});
  Log.associate = (models) => {
    Log.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  };
  return Log;
};