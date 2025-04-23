module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("Movie", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      overview: { type: DataTypes.TEXT },
      release_date: { type: DataTypes.DATE },
      poster_url: { type: DataTypes.STRING },
      backdrop_url: { type: DataTypes.STRING },
      type: { 
        type: DataTypes.ENUM,
        values:["movie", "series"],
        defaultValue: "movie",
        allowNull: false,
    },
      trailer_url: { type: DataTypes.STRING },
      video_url: { type: DataTypes.STRING },
      status: { 
        type: DataTypes.ENUM,
        values:["upcoming", "ongoing", "completed"],
        defaultValue: "upcoming",
        allowNull: false,
      },
      rating: { type: DataTypes.FLOAT },
      runtime: { type: DataTypes.INTEGER },
    });
  
    Movie.associate = (models) => {
        Movie.belongsToMany(models.Genre, { through: models.MovieGenre });
        Movie.hasMany(models.Comment);
        Movie.hasMany(models.Rating);
        Movie.belongsToMany(models.Person, { through: models.MovieCast });
        Movie.belongsToMany(models.Person, { through: models.MovieCrew });
        Movie.hasMany(models.Season);
      };
    
  
    return Movie;
  };
  