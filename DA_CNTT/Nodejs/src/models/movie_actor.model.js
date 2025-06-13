module.exports = (sequelize, DataTypes) => {
    const MovieActor = sequelize.define("MovieActor", {
      role: { type: DataTypes.STRING },
      seasonId: { type: DataTypes.INTEGER, allowNull: false },
      peopleId: { type: DataTypes.INTEGER, allowNull: false },
    },{
      timestamps: false,
    });
    
    MovieActor.associate = (models) => {
        MovieActor.belongsTo(models.Season, { foreignKey: 'seasonId' });
        MovieActor.belongsTo(models.People, { foreignKey: 'peopleId' });
    }
    return MovieActor;
  }; 