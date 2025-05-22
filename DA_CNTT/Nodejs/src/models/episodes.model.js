module.exports = (sequelize, Sequelize) => {
    const Episode = sequelize.define("Episode", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      episode_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      overview: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      runtime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      video_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      seasonId: {
        type: Sequelize.INTEGER,
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