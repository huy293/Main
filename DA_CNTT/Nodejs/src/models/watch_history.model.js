module.exports = (sequelize, DataTypes) => {
  const WatchHistory = sequelize.define('WatchHistory', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    episodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    watched_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  WatchHistory.associate = (models) => {
    WatchHistory.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    WatchHistory.belongsTo(models.Episode, {
      foreignKey: 'episodeId',
      as: 'episode',
    });
  };

  return WatchHistory;
};