module.exports = (sequelize, DataTypes) => {
    const MovieCast = sequelize.define("MovieCast", {
      role: { type: DataTypes.STRING },
    });
  
    return MovieCast;
  };
  