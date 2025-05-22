const { Favorite, User, Season } = require('../models');

exports.AddFavorite = async (userId, seasonId) => {
    const user = await User.findByPk(userId);
    const season = await Season.findByPk(seasonId);

    if (!user || !season) {
        throw new Error('User or Movie not found');
    }
    const existingFavorite = await Favorite.findOne({
        where: { userId, seasonId }
      });
      if (existingFavorite) {
        return { message: 'Movie is already in favorites', favorite: existingFavorite };
      }
    const favorite = await Favorite.create({ userId, seasonId });
    return favorite;
};

exports.RemoveFavorite = async (userId, seasonId) => {
    const favorite = await Favorite.findOne({ where: { userId, seasonId } });
    if (!favorite) return null;
    await favorite.destroy();
    return favorite;
};

exports.GetFavoritesByUser = async (userId) => {
    return await Favorite.findAll({ where: { userId } });
};
