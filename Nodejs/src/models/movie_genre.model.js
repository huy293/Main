module.exports = (sequelize, DataTypes) => {
    const MovieGenre = sequelize.define("MovieGenre", {}, { timestamps: false });
  
    return MovieGenre;
  };
  