module.exports = (sequelize, DataTypes) => {
    const Episode = sequelize.define("Episode", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      episode_number: {
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
      rumtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      video_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      seasonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Seasons',
          key: 'id',
        },
      },
    });
    Episode.associate = (models) => {
        Episode.belongsTo(models.Season, {
          foreignKey: 'seasonId',
        });
      };
    return Episode;
  }