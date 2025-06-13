const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieActor.controller');
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware(['admin', 'moderator']));

// POST: Thêm actor vào phim
router.post('/', controller.addActorToMovie);

// GET: Lấy actor của 1 phim
router.get('/movie/:seasonId', controller.getActorsOfMovie);

// PUT: Cập nhật vai trò
router.put('/:seasonId/:peopleId', controller.updateActorRole);

// DELETE: Xóa actor khỏi phim
router.delete('/:seasonId/:peopleId', controller.removeActorFromMovie);

// GET: Lấy danh sách phim người đó từng tham gia
router.get('/person/:peopleId', controller.getMoviesOfActor);

module.exports = router; 