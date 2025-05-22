// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify-email", authController.verifyEmail);
router.post("/change-password", authController.changePassword);
router.get(
  "/admin/me",
  authMiddleware(["admin", "moderator"]),
  (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

module.exports = router;
