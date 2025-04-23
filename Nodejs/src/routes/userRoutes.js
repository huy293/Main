const express = require('express');
const router = express.Router();

// Đây là một ví dụ API chỉ có thể truy cập khi đã xác thực JWT
router.get('/profile', (req, res) => {
  const user = req.user;  // Được thêm vào trong middleware authenticateJWT
  res.json({ id: user.id, username: user.username });
});

module.exports = router;
