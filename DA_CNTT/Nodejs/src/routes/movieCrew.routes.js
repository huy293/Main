const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieCrew.Controller');
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware(['admin', 'moderator']));

// POST: Thêm crew vào phim
router.post('/', controller.addCrewToMovie);

// GET: Lấy crew của 1 phim
router.get('/movie/:seasonId', controller.getCrewsOfMovie);

// PUT: Cập nhật công việc
router.put('/:seasonId/:peopleId', controller.updateCrewJob);

// DELETE: Xoá crew khỏi phim
router.delete('/:seasonId/:peopleId', controller.removeCrewFromMovie);

// GET: Lấy danh sách phim người đó từng làm crew
router.get('/person/:peopleId', controller.getMoviesOfCrew);

module.exports = router;
