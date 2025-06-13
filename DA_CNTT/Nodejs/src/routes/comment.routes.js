const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.Controller");
const authMiddleware = require("../middleware/authMiddleware"); // middleware gán req.user

router.use(authMiddleware()); // tất cả routes phải đăng nhập

router.post("/", commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.put("/:id", commentController.updateComment);
router.post("/:commentId/reply", commentController.replyToComment);
router.delete("/:id", commentController.deleteComment);
router.post("/season/:seasonId", commentController.createSeasonComment);

module.exports = router;
