module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      avatar: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: "user" },
    });
  
    User.associate = (models) => {    
        User.hasMany(models.Comment);
        User.hasMany(models.Rating);
        User.hasMany(models.WatchHistory);
        User.belongsToMany(models.Movie, { through: models.Favorite });
    }
    return User;
  };
  