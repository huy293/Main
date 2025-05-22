const express = require("express");
const router = express.Router();
const controller = require("../controllers/season.Controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware(["admin", "moderator"]));

// Tạo mùa phim mới cho một movie
router.post("/:movieId", controller.createSeason);

// Lấy tất cả các mùa của một movie
router.get("/movie/:movieId", controller.getSeasonsByMovie);

// Lấy chi tiết một mùa phim
router.get("/:id", controller.getSeasonById);

// Cập nhật mùa phim
router.put("/:id", controller.updateSeason);

// Xóa mùa phim
router.delete("/:id", controller.deleteSeason);

module.exports = router;
