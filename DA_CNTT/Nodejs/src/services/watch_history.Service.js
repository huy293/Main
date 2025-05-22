const { WatchHistory, Episode, Season, User } = require('../models');

// 1. Tạo mới lịch sử xem phim
exports.createWatchHistory = async (userId, episodeId = null) => {
  try {
    const watchHistory = await WatchHistory.create({
      userId,
      episodeId,
    });
    return watchHistory;
  } catch (error) {
    throw new Error('Error creating watch history');
  }
};

// 2. Lấy lịch sử xem phim của người dùng (bao gồm thông tin về Season)
exports.getWatchHistoryByUser = async (userId) => {
  try {
    const watchHistory = await WatchHistory.findAll({
      where: { userId },
      include: [
        {
          model: Episode,
          as: 'episode',
          attributes: ['id', 'title'],
          include: [
            {
              model: Season,
              as: 'season',
              attributes: ['id', 'title', 'seasonNumber'], // Thông tin mùa phim
            },
          ],
        },
      ],
    });
    return watchHistory;
  } catch (error) {
    throw new Error('Error retrieving watch history');
  }
};

// 3. Xóa lịch sử xem phim
exports.deleteWatchHistory = async (historyId) => {
  try {
    const deletedHistory = await WatchHistory.destroy({
      where: { id: historyId },
    });
    return deletedHistory;
  } catch (error) {
    throw new Error('Error deleting watch history');
  }
};

// 4. Cập nhật tiến độ phim bộ
exports.updateWatchHistory = async (historyId, episodeId) => {
  try {
    const updatedHistory = await WatchHistory.update(
      { episodeId },
      { where: { id: historyId } }
    );
    return updatedHistory;
  } catch (error) {
    throw new Error('Error updating watch history');
  }
};

// 5. Thống kê lịch sử xem phim (bao gồm thông tin về Season)
exports.getWatchHistoryStats = async (userId) => {
  try {
    const stats = await WatchHistory.findAll({
      where: { userId },
      include: [
        {
          model: Episode,
          as: 'episode',
          attributes: ['id', 'title'],
          include: [
            {
              model: Season,
              as: 'season',
              attributes: ['id', 'title', 'seasonNumber'], // Thông tin mùa phim
            },
          ],
        },
      ],
    });

    // Thống kê thể loại, số lượng phim đã xem, v.v.
    return stats;
  } catch (error) {
    throw new Error('Error retrieving watch history stats');
  }
};
