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
    });
    Season.associate = (models) => {
        Season.belongsTo(models.Movie); 
        Season.hasMany(models.Episode, {
            foreignKey: 'seasonId',
          });
      };
    return Season;
  }