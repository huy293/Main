// controllers/authController.js
const authService = require("../services/authService");

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
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Đặt true nếu dùng HTTPS
      maxAge: 60 * 60 * 1000, // 1 giờ
    });
    res.json({ message: "Đăng nhập thành công", token });
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