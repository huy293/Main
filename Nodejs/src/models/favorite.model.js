module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {}, { timestamps: false });

  return Favorite;
};
