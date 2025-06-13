module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movie", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: { 
        type: DataTypes.ENUM,
        values:["movie", "series"],
        defaultValue: "movie",
        allowNull: false,
      },
    });
  
    Movie.associate = (models) => {
        Movie.belongsToMany(models.Genre, { 
          through: models.MovieGenre,
          foreignKey: 'movieId',
          otherKey: 'genreId',
        });
        
    Movie.hasMany(models.Season, { foreignKey: 'movieId' });
        
        Movie.hasMany(models.MovieGenre, { foreignKey: 'movieId' });
    };
    return Movie;
  };
  