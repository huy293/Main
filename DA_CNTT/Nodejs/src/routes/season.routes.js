const express = require("express");
const router = express.Router();
const controller = require("../controllers/season.Controller");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/trending", controller.getTrendingSeasons);
router.get("/popular", controller.getPopularSeasons);
router.get("/top-rated", controller.getTopRatedSeasons);
router.get("/upcoming", controller.getUpcomingSeasons);
router.get("/now-playing", controller.getNowPlayingSeasons);
router.get("/by-genre/:genre", controller.getSeasonsByGenre);
router.get("/by-type", controller.getSeasonsByType);
router.get("/search", controller.searchSeasons);
router.get("/movie/:movieId", controller.getSeasonsByMovie);
router.get("/:id/comments", controller.getSeasonComments);
router.get("/:id/related", controller.getRelatedSeasons);
router.get("/:id", controller.getSeasonById);

// Protected routes
router.post("/:movieId", authMiddleware(["admin", "moderator"]), controller.createSeason);
router.put("/:id", authMiddleware(["admin", "moderator"]), controller.updateSeason);
router.delete("/:id", authMiddleware(["admin"]), controller.deleteSeason);

module.exports = router;
