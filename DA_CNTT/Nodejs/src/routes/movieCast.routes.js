const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieCast.Controller');
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware(['admin', 'moderator'])); // Yêu cầu quyền

// POST: Thêm người vào phim
router.post('/', controller.addPersonToMovie);

// GET: Lấy người tham gia của 1 phim
router.get('/movie/:seasonId', controller.getPeopleOfMovie);

// PUT: Cập nhật vai trò
router.put('/:movieId/:peopleId', controller.updatePersonRole);

// DELETE: Xoá người khỏi phim
router.delete('/:movieId/:peopleId', controller.removePersonFromMovie);

// GET: Lấy phim mà người đó đã tham gia
router.get('/person/:peopleId', controller.getMoviesOfPerson);

module.exports = router;
