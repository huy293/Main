const { Movie, User, Rating, Genre, Comment, Season, Episode, WatchHistory, Favorite, sequelize } = require('../models');
const { Op } = require('sequelize');

// Lấy thống kê tổng quan
exports.getStats = async () => {
    try {
        const [
            totalMovies,
            totalUsers,
            totalEpisodes,
            totalRatings,
            totalComments
        ] = await Promise.all([
            Movie.count(),
            User.count(),
            Episode.count(),
            Rating.count(),
            Comment.count()
        ]);

        const averageRating = await Rating.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
            ],
            raw: true
        });

        return {
            totalMovies,
            totalUsers,
            totalEpisodes,
            totalRatings,
            totalComments,
            averageRating: Number(averageRating?.averageRating || 0).toFixed(1)
        };
    } catch (error) {
        throw new Error('Lỗi khi lấy thống kê tổng quan: ' + error.message);
    }
};

// Lấy thống kê lượt xem theo tháng
exports.getMonthlyViews = async () => {
    try {
        const currentYear = new Date().getFullYear();
        const monthlyViews = await WatchHistory.findAll({
            attributes: [
                [sequelize.fn('MONTH', sequelize.col('watched_at')), 'month'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'views']
            ],
            where: {
                watched_at: {
                    [Op.gte]: new Date(currentYear, 0, 1),
                    [Op.lte]: new Date(currentYear, 11, 31)
                }
            },
            group: [sequelize.fn('MONTH', sequelize.col('watched_at'))],
            raw: true
        });

        // Điền đầy đủ 12 tháng với giá trị mặc định là 0
        const allMonths = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            views: 0
        }));

        monthlyViews.forEach(view => {
            allMonths[view.month - 1].views = parseInt(view.views);
        });

        return allMonths;
    } catch (error) {
        throw new Error('Lỗi khi lấy thống kê lượt xem theo tháng: ' + error.message);
    }
};

// Lấy phân bố thể loại phim
exports.getGenreDistribution = async () => {
    try {
        const genres = await Genre.findAll({
            include: [{
                model: Movie,
                attributes: []
            }],
            attributes: [
                'name',
                [sequelize.fn('COUNT', sequelize.col('Movies.id')), 'movieCount']
            ],
            group: ['Genre.id', 'Genre.name'],
            raw: true
        });

        return genres;
    } catch (error) {
        throw new Error('Lỗi khi lấy phân bố thể loại: ' + error.message);
    }
};

// Lấy hoạt động gần đây
exports.getRecentActivities = async () => {
    try {
        const [recentComments, recentRatings] = await Promise.all([
            Comment.findAll({
                include: [
                    { model: User, attributes: ['username'] },
                    { model: Season, attributes: ['title'] }
                ],
                order: [['createdAt', 'DESC']],
                limit: 5
            }),
            Rating.findAll({
                include: [
                    { model: User, attributes: ['username'] },
                    { model: Season, attributes: ['title'] }
                ],
                order: [['createdAt', 'DESC']],
                limit: 5
            })
        ]);

        const activities = [
            ...recentComments.map(comment => ({
                type: 'comment',
                username: comment.User.username,
                movieTitle: comment.Season.title,
                content: comment.content,
                createdAt: comment.createdAt
            })),
            ...recentRatings.map(rating => ({
                type: 'rating',
                username: rating.User.username,
                movieTitle: rating.Season.title,
                rating: rating.rating,
                createdAt: rating.createdAt
            }))
        ].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

        return activities;
    } catch (error) {
        throw new Error('Lỗi khi lấy hoạt động gần đây: ' + error.message);
    }
};

// Lấy top phim được xem nhiều
exports.getTopMovies = async () => {
    try {
        const topMovies = await Season.findAll({
            attributes: [
                'id',
                'title',
                'poster_url',
                'rating',
                [sequelize.fn('COUNT', sequelize.col('WatchHistories.id')), 'viewCount']
            ],
            include: [{
                model: WatchHistory,
                attributes: []
            }],
            group: ['Season.id'],
            order: [[sequelize.fn('COUNT', sequelize.col('WatchHistories.id')), 'DESC']],
            limit: 5,
            raw: true
        });

        return topMovies;
    } catch (error) {
        throw new Error('Lỗi khi lấy top phim: ' + error.message);
    }
};

// Lấy tỷ lệ hoàn thành xem phim
exports.getCompletionRate = async () => {
    try {
        const totalEpisodes = await Episode.count();
        const completedViews = await WatchHistory.count({
            distinct: true,
            col: 'userId'
        });

        const completionRate = totalEpisodes > 0
            ? (completedViews / totalEpisodes * 100).toFixed(1)
            : 0;

        return {
            totalEpisodes,
            completedViews,
            completionRate
        };
    } catch (error) {
        throw new Error('Lỗi khi lấy tỷ lệ hoàn thành: ' + error.message);
    }
}; 