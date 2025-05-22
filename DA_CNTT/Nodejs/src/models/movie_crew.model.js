module.exports = (sequelize, DataTypes) => {
    const MovieCrew = sequelize.define("MovieCrew", {
      job: { type: DataTypes.STRING },
    },{
      timestamps: false,
    });
    
    MovieCrew.associate = (models) => {
        MovieCrew.belongsTo(models.Season, { foreignKey: 'seasonId' });
        MovieCrew.belongsTo(models.People, { foreignKey: 'peopleId' });
    }
    return MovieCrew;
  };
  