module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("Rating", {
      rating: { type: DataTypes.INTEGER }, // 1 -> 5 stars
    });
    Rating.associate = (models) => {
      // Định nghĩa quan hệ với User và Movie, chỉ định khóa ngoại rõ ràng
      Rating.belongsTo(models.User, { foreignKey: 'userId' });
      Rating.belongsTo(models.Season, { foreignKey: 'seasonId' });
    };
    return Rating;
  };
  