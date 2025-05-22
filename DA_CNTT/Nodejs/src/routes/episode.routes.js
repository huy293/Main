const express = require("express");
const router = express.Router();
const controller = require("../controllers/episode.Controller");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware(["admin", "moderator"])); // tất cả routes phải đăng nhập và có quyền admin hoặc moderator
// // POST: Tạo tập mới
router.post("/", controller.createEpisode);

// PUT: Cập nhật tập phim
router.put("/:id", controller.updateEpisode);

// // DELETE: Xoá tập phim
router.delete("/:id", controller.deleteEpisode);

// // GET: Danh sách tập theo season
router.get("/season/:seasonId", controller.getEpisodesBySeason);

// // GET: Chi tiết 1 tập phim
router.get("/:id", controller.getEpisodeById);

module.exports = router;