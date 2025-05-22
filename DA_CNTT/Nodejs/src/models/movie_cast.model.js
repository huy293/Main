module.exports = (sequelize, DataTypes) => {
    const MovieCast = sequelize.define("MovieCast", {
      role: { type: DataTypes.STRING },
    }, {
      timestamps: false,
    });
    
    MovieCast.associate = (models) => {
        MovieCast.belongsTo(models.Season, { foreignKey: 'seasonId' });
        MovieCast.belongsTo(models.People, { foreignKey: 'peopleId' });
    }
    return MovieCast;
  };
  