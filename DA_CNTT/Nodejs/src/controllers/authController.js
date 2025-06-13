// controllers/authController.js
const authService = require("../services/authService");
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const verificationCode = await authService.registerUser(req, email, username, password);

    res.status(201).json({ message: "Đăng ký thành công. Vui lòng kiểm tra email để xác thực.", verificationCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { userInputCode } = req.body;
    const newUser = await authService.verifyEmailAndCreateUser(req, userInputCode);
    res.status(200).json({ message: "Xác thực email thành công", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUser(email, password);
    
    // Lưu token trong cookie
    res.cookie("token", token, {
      httpOnly: true, // Cookie chỉ có thể được truy cập bởi server
      secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong môi trường production
      sameSite: 'strict', // Bảo vệ chống CSRF
      maxAge: 2 * 60 * 60 * 1000 // 2h
    });

    res.json({ 
      success: true, 
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    // Xóa cookie token với cùng options khi tạo
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.json({ success: true, message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const updatedPass = await authService.changePasswordByEmail(email);
    res.status(200).json(updatedPass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        // Find user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await user.update({ password: hashedPassword });

        res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error('Error in updatePassword:', error);
        res.status(500).json({ message: 'Lỗi khi đổi mật khẩu' });
    }
};