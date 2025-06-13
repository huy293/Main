module.exports = (sequelize, DataTypes) => {
    const MovieCrew = sequelize.define("MovieCrew", {
      job: { type: DataTypes.STRING },
      seasonId: { type: DataTypes.INTEGER, allowNull: false },
      peopleId: { type: DataTypes.INTEGER, allowNull: false },
    },{
      timestamps: false,
    });
    
    MovieCrew.associate = (models) => {
        MovieCrew.belongsTo(models.Season, { foreignKey: 'seasonId' });
        MovieCrew.belongsTo(models.People, { foreignKey: 'peopleId' });
    }
    return MovieCrew;
  };
  