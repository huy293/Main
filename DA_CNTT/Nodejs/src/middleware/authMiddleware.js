const jwt = require("jsonwebtoken");
require("dotenv").config();

// authMiddleware cho phép truyền vào role yêu cầu
module.exports = function (roles = []) {
  // roles có thể là 1 string ("admin") hoặc mảng ["admin", "moderator"]
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Nếu roles có quy định mà role user không nằm trong đó
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Bạn không có quyền truy cập." });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn.", error: err.message });
    }
  };
};
