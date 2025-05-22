const express = require("express");
const router = express.Router();
const controller = require("../controllers/movie_genre.Controller");
const authMiddleware = require("../middleware/authMiddleware"); // middleware gán req.user

router.use(authMiddleware(["admin", "moderator"])); // tất cả routes phải đăng nhập
// GET: Lấy danh sách thể loại của phim
router.get("/" ,controller.getAllGenres)
router.get("/:movieId", controller.getGenresOfMovie);

// PUT: Cập nhật danh sách thể loại mới cho phim
router.put("/:movieId", controller.updateMovieGenres);

module.exports = router;
