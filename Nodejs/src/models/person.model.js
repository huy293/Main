module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define("Person", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      birthday: { type: DataTypes.DATE },
      gender: { type: DataTypes.STRING },
      biography: { type: DataTypes.TEXT },
      profile_url: { type: DataTypes.STRING },
    });
  
    Person.associate = (models) => {
        Person.belongsToMany(models.Movie, { through: models.MovieCast });
        Person.belongsToMany(models.Movie, { through: models.MovieCrew });
    };
    return Person;
  };
  