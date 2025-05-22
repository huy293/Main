'use strict';
const bcrypt = require('bcrypt');
require('dotenv').config(); // Nạp các biến môi trường từ .env

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Import model User từ thư mục models
    const { User } = require('../models');  // Đảm bảo đường dẫn đúng với cấu trúc dự án của bạn

    // Kiểm tra xem đã có admin chưa
    const admin = await User.findOne({
      where: {
        role: 'admin',
      },
    });

    if (!admin) {
      // Mã hóa mật khẩu admin
      const hashedPassword = await bcrypt.hash(process.env.PASSWORD_ADMIN, 10);  // Dùng mật khẩu từ .env để mã hóa

      // Chèn tài khoản admin vào bảng Users với mật khẩu đã mã hóa
      await queryInterface.bulkInsert('Users', [
        {
          username: process.env.ACCOUNT_ADMIN,  // Sử dụng biến môi trường từ .env
          email: process.env.EMAIL_ADMIN,  // Sử dụng biến môi trường từ .env
          password: hashedPassword,  // Mật khẩu đã mã hóa
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    // Xóa tài khoản admin nếu có
    await queryInterface.bulkDelete('Users', { role: 'admin' }, {});
  }
};
