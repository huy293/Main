const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.Controller");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes - Ai cũng có thể truy cập
router.get("/", movieController.getAllMovies); // Lấy danh sách phim
router.get("/with-genres", movieController.getAllWithGenres); // Lấy danh sách phim kèm thể loại

// Protected routes - Chỉ admin/moderator mới có thể truy cập
router.post("/", authMiddleware(["admin", "moderator"]), movieController.createMovie); // Thêm phim
router.put("/:id", authMiddleware(["admin", "moderator"]), movieController.updateMovie); // Sửa phim
router.delete("/:id", authMiddleware(["admin"]), movieController.deleteMovie); // Xóa phim (chỉ admin)

// Route chi tiết phim phải đặt sau cùng
router.get("/:id", movieController.getMovieById); // Xem chi tiết phim

module.exports = router;
