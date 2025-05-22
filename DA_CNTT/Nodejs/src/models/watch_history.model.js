module.exports = (sequelize, DataTypes) => {
  const WatchHistory = sequelize.define('WatchHistory', {
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