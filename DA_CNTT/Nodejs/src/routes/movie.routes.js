const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie.Controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware(["admin", "moderator"]), movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.put("/:id", authMiddleware(["admin", "moderator"]), movieController.updateMovie);
router.delete("/:id", authMiddleware(["admin"]), movieController.deleteMovie);

module.exports = router;
