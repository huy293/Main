const ratingService = require('../services/rating.Service');

// Controller cho User tạo hoặc cập nhật rating
exports.createOrUpdateRating = async (req, res) => {
  const { seasonId } = req.params; // Lấy seasonId từ params
  const { rating } = req.body; // Lấy rating từ body

  try {
    // Gọi service tạo hoặc cập nhật rating
    const userId = req.user.id; // Lấy userId từ token
    const updatedRating = await ratingService.createOrUpdateRating(userId, seasonId, rating);
    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller cho User lấy rating của mình cho một bộ phim
exports.getUserRatingForMovie = async (req, res) => {
  const { seasonId } = req.params;

  try {
    const userId = req.user.id;
    const rating = await ratingService.getUserRatingForMovie(userId, seasonId);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found for this movie.' });
    }
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller cho Admin xem tất cả ratings của một bộ phim
exports.getAllRatingsForMovie = async (req, res) => {
  const { seasonId } = req.params;

  try {
    const ratings = await ratingService.getAllRatingsForMovie(seasonId);
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAverageRatingForMovie = async (req, res) => {
    const { seasonId } = req.params;
  
    try {
      const averageRating = await ratingService.getAverageRatingForMovie(seasonId);
      res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };