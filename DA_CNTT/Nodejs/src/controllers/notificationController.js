const { Notification } = require("../models");
const { Op } = require("sequelize");

exports.getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { forRole: { [Op.in]: ['admin', 'moderator'] } },
      order: [['createdAt', 'DESC']],
      limit: 100
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy thông báo" });
  }
};