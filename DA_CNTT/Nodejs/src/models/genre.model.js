module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    });
  
    // Associations
    Genre.associate = (models) => {
        Genre.belongsToMany(models.Movie, { 
          through: models.MovieGenre,
          foreignKey: 'genreId', 
          otherKey: 'movieId',
        });
      };  
    return Genre;
  };
  