module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      content: { type: DataTypes.TEXT, allowNull: false },
    });
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: 'userId' });
      Comment.belongsTo(models.Season, { foreignKey: 'seasonId' });
    };
    return Comment;
  };
  