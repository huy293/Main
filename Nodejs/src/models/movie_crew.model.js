module.exports = (sequelize, DataTypes) => {
    const MovieCrew = sequelize.define("MovieCrew", {
      job: { type: DataTypes.STRING },
    });
  
    return MovieCrew;
  };
  