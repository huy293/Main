const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.Controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:seasonId', authMiddleware(), ratingController.createOrUpdateRating); // Đánh giá hoặc cập nhật rating
router.get('/:seasonId', authMiddleware(), ratingController.getUserRatingForMovie); // Lấy rating của user cho phim
router.get('/admin/:seasonId', authMiddleware('admin'), ratingController.getAllRatingsForMovie); // Xem tất cả ratings của bộ phim
router.get('/admin/average/:seasonId', authMiddleware('admin'), ratingController.getAverageRatingForMovie); // Lấy trung bình rating của bộ phim

module.exports = router;
