const favoriteService = require('../services/favorite.Service');

exports.addFavorite = async (req, res) => {
    const { userId, seasonId } = req.body;
    try {
        const favorite = await favoriteService.AddFavorite(userId, seasonId);
        return res.status(201).json(favorite);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    const { userId, seasonId } = req.body;
    try {
        const favorite = await favoriteService.RemoveFavorite(userId, seasonId);
        if (!favorite) return res.status(404).json({ error: 'Favorite not found' });
        return res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getFavoritesByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const favorites = await favoriteService.GetFavoritesByUser(userId);
        return res.status(200).json(favorites);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
