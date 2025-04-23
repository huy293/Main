module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("Rating", {
      rating: { type: DataTypes.INTEGER }, // 1 -> 5 stars
    });
  
    return Rating;
  };
  