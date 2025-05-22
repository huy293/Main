module.exports = (sequelize, DataTypes) => {
    const MovieGenre = sequelize.define("MovieGenre", {}, { timestamps: false });
    MovieGenre.associate = (models) => {
      MovieGenre.belongsTo(models.Movie, { foreignKey: 'movieId' });
      MovieGenre.belongsTo(models.Genre, { foreignKey: 'genreId' });
    };
    return MovieGenre;
  };
  