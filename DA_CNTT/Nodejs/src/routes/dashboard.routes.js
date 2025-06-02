const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.Controller');
const authMiddleware = require('../middleware/authMiddleware');

// Tất cả các route dashboard đều yêu cầu quyền admin
router.use(authMiddleware('admin, moderator'));

// Lấy thống kê tổng quan
router.get('/stats', dashboardController.getStats);

// Lấy thống kê lượt xem theo tháng
router.get('/monthly-views', dashboardController.getMonthlyViews);

// Lấy phân bố thể loại phim
router.get('/genre-distribution', dashboardController.getGenreDistribution);

// Lấy hoạt động gần đây
router.get('/recent-activities', dashboardController.getRecentActivities);

// Lấy top phim
router.get('/top-movies', dashboardController.getTopMovies);

// Lấy tỷ lệ hoàn thành
router.get('/completion-rate', dashboardController.getCompletionRate);

module.exports = router;
