module.exports = (sequelize, DataTypes) => {
    const People = sequelize.define("People", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      birthday: { type: DataTypes.DATE },
      gender: { type: DataTypes.STRING },
      biography: { type: DataTypes.TEXT },
      profile_url: { type: DataTypes.STRING },
    });
  
    People.associate = (models) => {
        People.belongsToMany(models.Season, { through: models.MovieActor, foreignKey: 'peopleId', otherKey: 'seasonId' });
        People.belongsToMany(models.Season, { through: models.MovieCrew, foreignKey: 'peopleId', otherKey: 'seasonId' });
    };
    return People;
  };
  