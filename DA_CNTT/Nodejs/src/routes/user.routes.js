const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/changerole/:id", authMiddleware(["admin"]), userController.changeRole);
router.get("/", authMiddleware(["admin", "moderator"]), userController.getAllUsers);
router.get("/admins", authMiddleware(["admin"]), userController.getAllAdmins);
router.get("/:id", authMiddleware(["admin", "moderator"]), userController.getUserById);
router.put("/:id", authMiddleware(["admin", "user"]), userController.updateUser);
router.put("/update-avatar/:id", authMiddleware(["admin","user"]), userController.updateAvatar);
router.put("/toggle-lock/:userId", authMiddleware(["admin"]), userController.toggleLockUser);
router.get("/logs/:userId", authMiddleware(["admin"]), userController.getLogs);
router.get("/permissions/:userId", authMiddleware(["admin"]), userController.getPermissions);
router.put("/permissions/:userId", authMiddleware(["admin"]), userController.updatePermissions);

module.exports = router;