module.exports = (sequelize, DataTypes) => {
    const Season = sequelize.define("Season", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      season_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      release_date: { type: DataTypes.DATE },
      poster_url: { type: DataTypes.STRING },
      backdrop_url: { type: DataTypes.STRING },
      trailer_url: { type: DataTypes.STRING },
      status: { 
        type: DataTypes.ENUM,
        values:["upcoming", "ongoing", "completed"],
        defaultValue: "upcoming",
        allowNull: false,
      },
      rating: { 
        type: DataTypes.FLOAT,
        defaultValue: 0 
      },
      runtime: { type: DataTypes.INTEGER },
    });
    Season.associate = (models) => {
        Season.belongsTo(models.Movie, {
          foreignKey: 'movieId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        }); 
        Season.hasMany(models.Episode, {
            foreignKey: 'seasonId',
          });
      
      Season.hasMany(models.Rating, { foreignKey: 'seasonId' });
      Season.hasMany(models.Favorite, { foreignKey: 'seasonId' });
      Season.hasMany(models.Comment, { foreignKey: 'seasonId' });
      Season.belongsToMany(models.People, { through: models.MovieCast, foreignKey: 'seasonId' });
      Season.belongsToMany(models.People, { through: models.MovieCrew, foreignKey: 'seasonId' });
      };
    return Season;
  }