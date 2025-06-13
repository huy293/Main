// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { User } = require("../models");
const userController = require("../controllers/user.Controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify-email", authController.verifyEmail);
router.post("/change-password", authController.changePassword);
router.post("/update-password", authMiddleware(["admin", "user", "moderator"]), authController.updatePassword);
router.post("/logout", authMiddleware(), authController.logout);
router.get(
  "/admin/me",
  authMiddleware(["admin", "moderator"]),
  (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

// API mới cho user thông thường
router.get("/me", authMiddleware(["admin", "user", "moderator"]), async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'Không tìm thấy người dùng' 
            });
        }

        res.status(200).json({ 
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Error in /me endpoint:', error);
        res.status(500).json({ 
            success: false,
            message: 'Lỗi server' 
        });
    }
});

module.exports = router;
