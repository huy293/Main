module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {}, { timestamps: false });
  Favorite.associate = (models) => {
    // Định nghĩa quan hệ với User và Movie, chỉ định khóa ngoại rõ ràng
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Season, { foreignKey: 'seasonId' });
  };
  Favorite.removeAttribute('id');
  Favorite.primaryKeyAttributes = ['userId', 'seasonId'];
  return Favorite;
};
