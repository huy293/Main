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
            attributes: [
                'id',
                'name',
                [sequelize.fn('COUNT', sequelize.col('Movies.id')), 'movieCount']
            ],
            include: [
                {
                    model: Movie,
                    attributes: [],
                    through: { attributes: [] }, // Không lấy trường trung gian
                    required: false // Lấy cả genre chưa có movie
                }
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

exports.getTopSeasons = async () => {
    const histories = await WatchHistory.findAll({
        include: [{
            model: Episode,
            as: 'episode', // dùng đúng alias
            attributes: ['seasonId'],
            required: true
        }],
        attributes: [
            [sequelize.col('episode.seasonId'), 'seasonId'],
            [sequelize.fn('COUNT', sequelize.col('WatchHistory.id')), 'viewCount']
        ],
        group: ['episode.seasonId'],
        order: [[sequelize.literal('viewCount'), 'DESC']],
        limit: 10,
        raw: true
    });

    const seasonIds = histories.map(h => Number(h.seasonId));
    const seasons = await Season.findAll({
        where: { id: seasonIds },
        attributes: ['id', 'title', 'movieId'],
        include: [
            {
                model: Movie,
                attributes: ['id', 'title']
            }
        ],
        raw: true,
        nest: true
    });

    return histories.map(h => {
        const season = seasons.find(s => Number(s.id) === Number(h.seasonId));
        return {
            seasonId: Number(h.seasonId),
            viewCount: Number(h.viewCount),
            title: season ? season.title : null,
            movieId: season ? season.movieId : null,
            movie: season && season.Movie ? season.Movie : null
        };
    });
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
exports.getNewUsersByMonth = async () => {
    const currentYear = new Date().getFullYear();
    const users = await User.findAll({
        attributes: [
            [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: {
            createdAt: {
                [Op.gte]: new Date(currentYear, 0, 1),
                [Op.lte]: new Date(currentYear, 11, 31)
            }
        },
        group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
        raw: true
    });

    // Đảm bảo đủ 12 tháng
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: 0
    }));
    users.forEach(u => {
        allMonths[u.month - 1].count = parseInt(u.count);
    });
    return allMonths;
};
// 2. Phim mới theo tháng
exports.getNewMoviesByMonth = async () => {
    const currentYear = new Date().getFullYear();
    const seasons = await Season.findAll({
        attributes: [
            [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: {
            createdAt: {
                [Op.gte]: new Date(currentYear, 0, 1),
                [Op.lte]: new Date(currentYear, 11, 31)
            }
        },
        group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
        raw: true
    });
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: 0
    }));
    seasons.forEach(s => {
        allMonths[s.month - 1].count = parseInt(s.count);
    });
    return allMonths;
};

// 3. Top user xem nhiều nhất
exports.getTopUsers = async () => {
    // Đếm số lượt xem của từng user
    const histories = await WatchHistory.findAll({
        attributes: [
            'userId',
            [sequelize.fn('COUNT', sequelize.col('id')), 'viewCount']
        ],
        group: ['userId'],
        order: [[sequelize.literal('viewCount'), 'DESC']],
        limit: 10,
        raw: true
    });

    // Lấy thông tin user
    const users = await User.findAll({
        where: { id: { [Op.in]: histories.map(h => h.userId) } },
        attributes: ['id', 'username', 'email']
    });

    // Gộp dữ liệu
    return histories.map(h => ({
        userId: h.userId,
        viewCount: h.viewCount,
        user: users.find(u => u.id === h.userId)
    }));
};

// 4. Top phim được yêu thích nhất
exports.getTopFavoriteMovies = async () => {
    // Đếm số lượt favorite theo seasonId
    const favorites = await Favorite.findAll({
        attributes: [
            'seasonId',
            [sequelize.fn('COUNT', sequelize.col('seasonId')), 'favoriteCount']
        ],
        group: ['seasonId'],
        order: [[sequelize.literal('favoriteCount'), 'DESC']],
        limit: 10,
        raw: true
    });

    // Lấy thông tin season
    const seasons = await Season.findAll({
        where: { id: { [Op.in]: favorites.map(f => f.seasonId) } },
        attributes: ['id', 'title']
    });

    // Gộp dữ liệu
    return favorites.map(f => ({
        ...f,
        season: seasons.find(s => s.id === f.seasonId)
    }));
};

// 5. Rating trung bình theo thể loại
exports.getAverageRatingByGenre = async () => {
    // Lấy tất cả genre
    const genres = await Genre.findAll({ attributes: ['id', 'name'], raw: true });

    const result = [];
    for (const genre of genres) {
        // Lấy tất cả movie thuộc genre này
        const movies = await Movie.findAll({
            include: [{
                model: Genre,
                where: { id: genre.id },
                attributes: []
            }],
            attributes: ['id'],
            raw: true
        });

        const movieIds = movies.map(m => m.id);
        if (movieIds.length === 0) {
            result.push({ genre: genre.name, avgRating: "0.00" });
            continue;
        }

        // Lấy tất cả season thuộc các movie này
        const seasons = await Season.findAll({
            where: { movieId: movieIds },
            attributes: ['id'],
            raw: true
        });
        const seasonIds = seasons.map(s => s.id);
        if (seasonIds.length === 0) {
            result.push({ genre: genre.name, avgRating: "0.00" });
            continue;
        }

        // Tính trung bình rating của các season này
        const rating = await Rating.findOne({
            where: { seasonId: seasonIds },
            attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
            raw: true
        });

        result.push({
            genre: genre.name,
            avgRating: Number(rating.avgRating || 0).toFixed(2)
        });
    }
    return result;
};

// 6. Số lượng comment theo tháng
exports.getCommentsByMonth = async () => {
    const currentYear = new Date().getFullYear();
    const comments = await Comment.findAll({
        attributes: [
            [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        where: {
            createdAt: {
                [Op.gte]: new Date(currentYear, 0, 1),
                [Op.lte]: new Date(currentYear, 11, 31)
            }
        },
        group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
        raw: true
    });
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: 0
    }));
    comments.forEach(c => {
        allMonths[c.month - 1].count = parseInt(c.count);
    });
    return allMonths;
};

// 7. Tỷ lệ user theo vai trò
exports.getUserRoleDistribution = async () => {
    const roles = await User.findAll({
        attributes: [
            'role',
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['role'],
        raw: true
    });
    return roles;
};
exports.getNewestUsers = async () => {
    return await User.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        attributes: ['id', 'username', 'email', 'createdAt'],
        raw: true
    });
};
exports.getNewestSeasons = async () => {
    return await Season.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
        attributes: ['id', 'title', 'createdAt'],
        raw: true
    });
};
exports.getTopRatedSeasons = async () => {
    const ratings = await Rating.findAll({
        attributes: [
            'seasonId',
            [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
        ],
        group: ['seasonId'],
        order: [[sequelize.literal('avgRating'), 'DESC']],
        limit: 10,
        raw: true
    });
    const seasons = await Season.findAll({
        where: { id: ratings.map(r => r.seasonId) },
        attributes: ['id', 'title'],
        raw: true
    });
    return ratings.map(r => ({
        ...r,
        season: seasons.find(s => s.id === r.seasonId)
    }));
};