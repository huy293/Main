const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/changerole/:id", authMiddleware(["admin"]), userController.changeRole);
router.get("/", authMiddleware(["admin", "moderator"]), userController.getAllUsers);
router.get("/:id", authMiddleware(["admin", "moderator"]), userController.getUserById);
router.put("/update-avatar/:id", authMiddleware(["admin","user"]), userController.updateAvatar);

module.exports = router;