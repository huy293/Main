const dashboardService = require('../services/dashboard.Service');
const dashboardController = {
    // Lấy thống kê tổng quan
    getStats: async (req, res) => {
        try {
            const stats = await dashboardService.getStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({
                error: 'Không thể lấy thống kê tổng quan',
                details: error.message
            });
        }
    },

    // Lấy thống kê lượt xem theo tháng
    getMonthlyViews: async (req, res) => {
        try {
            const monthlyViews = await dashboardService.getMonthlyViews();
            res.json(monthlyViews);
        } catch (error) {
            res.status(500).json({
                error: 'Không thể lấy thống kê lượt xem theo tháng',
                details: error.message
            });
        }
    },

    // Lấy phân bố thể loại phim
    getGenreDistribution: async (req, res) => {
        try {
            const distribution = await dashboardService.getGenreDistribution();
            res.json(distribution);
        } catch (error) {
            res.status(500).json({
                error: 'Không thể lấy phân bố thể loại phim',
                details: error.message
            });
        }
    },

    // Lấy hoạt động gần đây
    getRecentActivities: async (req, res) => {
        try {
            const activities = await dashboardService.getRecentActivities();
            res.json(activities);
        } catch (error) {
            res.status(500).json({
                error: 'Không thể lấy hoạt động gần đây',
                details: error.message
            });
        }
    },

    // Lấy top phim
    getTopMovies: async (req, res) => {
        try {
            const topMovies = await dashboardService.getTopMovies();
            res.json(topMovies);
        } catch (error) {
            res.status(500).json({
                error: 'Không thể lấy danh sách top phim',
                details: error.message
            });
        }
    },

    // Lấy tỷ lệ hoàn thành
    getCompletionRate: async (req, res) => {
        try {
            const completionRate = await dashboardService.getCompletionRate();
            res.json(completionRate);
        } catch (error) {
            res.status(500).json({
                error: 'Không thể lấy tỷ lệ hoàn thành',
                details: error.message
            });
        }
    }
};

module.exports = dashboardController; 