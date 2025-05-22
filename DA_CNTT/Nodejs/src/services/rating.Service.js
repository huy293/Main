const { Rating, Season, User } = require('../models'); // Import các models

// Service để tạo hoặc cập nhật rating
exports.createOrUpdateRating = async (userId, seasonId, ratingValue) => {
  if (ratingValue < 1 || ratingValue > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  // Kiểm tra nếu user đã đánh giá bộ phim này chưa
  const existingRating = await Rating.findOne({
    where: { userId, seasonId }
  });

  if (existingRating) {
    // Nếu đã có rating, cập nhật lại
    existingRating.rating = ratingValue;
    await existingRating.save();
    return existingRating;
  } else {
    // Nếu chưa có rating, tạo mới
    const newRating = await Rating.create({
      userId,
      seasonId,
      rating: ratingValue,
    });
    return newRating;
  }
};

// Service để lấy rating của user cho một bộ phim
exports.getUserRatingForMovie = async (userId, seasonId) => {
  const rating = await Rating.findOne({
    where: { userId, seasonId },
  });
  return rating;
};

// Service để lấy tất cả ratings của một bộ phim (dành cho admin)
exports.getAllRatingsForMovie = async (seasonId) => {
  const ratings = await Rating.findAll({
    where: { seasonId },
    include: [{ model: User, attributes: ['id', 'username'] }] // Include thông tin user nếu cần
  });
  return ratings;
};
exports.getAverageRatingForMovie = async (seasonId) => {
    const ratings = await Rating.findAll({
      where: { seasonId }
    });
  
    if (ratings.length === 0) {
      return 0; // Nếu không có rating nào, trả về 0
    }
  
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return totalRating / ratings.length; // Tính trung bình
  };