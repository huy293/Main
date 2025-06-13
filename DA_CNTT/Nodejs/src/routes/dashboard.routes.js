const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.Controller');
const authMiddleware = require('../middleware/authMiddleware');

// Tất cả các route dashboard đều yêu cầu quyền admin
router.use(authMiddleware(["admin", "moderator"]));

// Lấy thống kê tổng quan
router.get('/stats', dashboardController.getStats);

// Lấy thống kê lượt xem theo tháng
router.get('/monthly-views', dashboardController.getMonthlyViews);

// Lấy phân bố thể loại phim
router.get('/genre-distribution', dashboardController.getGenreDistribution);

// Lấy hoạt động gần đây
router.get('/recent-activities', dashboardController.getRecentActivities);

// Lấy top phim
router.get('/top-seasons', dashboardController.getTopSeasons);

// Lấy tỷ lệ hoàn thành
router.get('/completion-rate', dashboardController.getCompletionRate);

// 1. User mới theo tháng
router.get('/new-users-by-month', dashboardController.getNewUsersByMonth);

// 2. Phim mới theo tháng
router.get('/new-movies-by-month', dashboardController.getNewMoviesByMonth);

// 3. Top user xem nhiều nhất
router.get('/top-users', dashboardController.getTopUsers);

// 4. Top phim được yêu thích nhất
router.get('/top-favorite-movies', dashboardController.getTopFavoriteMovies);

// 5. Rating trung bình theo thể loại
router.get('/average-rating-by-genre', dashboardController.getAverageRatingByGenre);

// 6. Số lượng comment theo tháng
router.get('/comments-by-month', dashboardController.getCommentsByMonth);

// 7. Tỷ lệ user theo vai trò
router.get('/user-role-distribution', dashboardController.getUserRoleDistribution);

router.get('/newest-users', dashboardController.getNewestUsers);
router.get('/newest-seasons', dashboardController.getNewestSeasons);
router.get('/top-rated-seasons', dashboardController.getTopRatedSeasons);

module.exports = router;
