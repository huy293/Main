module.exports = (sequelize, DataTypes) => {
    const WatchHistory = sequelize.define("WatchHistory", {
      watched_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    });
  
    return WatchHistory;
  };
  