// services/authService.js
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const redis = require("redis");
const client = redis.createClient();
const sendVerificationEmail = async (email, verificationCode) => {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,       // smtp.gmail.com
      port: process.env.EMAIL_PORT,       // 587
      secure: false,                      // false vì dùng TLS (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
    const mailOptions = {
      from: `"HH MOVIE" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Xác thực email đăng ký từ HH MOVIE",
      html: `
      <p>Kính gửi Quý khách,</p>
  
      <p>Chúng tôi đã nhận được yêu cầu đăng ký tài khoản trên hệ thống của chúng tôi. Để hoàn tất quá trình đăng ký, vui lòng nhập mã xác thực sau vào giao diện đăng ký của bạn.</p>
  
      <p><strong>Mã xác thực của bạn là: ${verificationCode}</strong></p>
  
      <p>Mã xác thực này sẽ hết hạn trong vòng 10 phút. Nếu bạn không yêu cầu đăng ký, vui lòng bỏ qua email này.</p>
  
      <p>Chúng tôi rất trân trọng sự tin tưởng của bạn và mong muốn mang đến trải nghiệm tốt nhất.</p>
  
      <p>Trân trọng,</p>
      <p>Đội ngũ hỗ trợ khách hàng<br/>[HH MOVIE]</p>
    `
    };
  
    await transporter.sendMail(mailOptions);
  };

  const registerUser = async (req, email, username, password) => {
    const userExist = await User.findOne({ where: { email } });
    if (userExist) throw new Error("Email đã tồn tại.");
  
    // Tạo mã xác thực ngẫu nhiên
    const verificationCode = Math.floor(Math.random() * 900000) + 100000;
    const hashedCode = await bcrypt.hash(verificationCode.toString(), 10);
    // Lưu mã xác thực vào bộ nhớ tạm hoặc cơ sở dữ liệu
    // (ở đây mình lưu trong app.locals cho đơn giản, bạn có thể lưu vào DB)
    // Bạn có thể sử dụng Redis hoặc cơ sở dữ liệu để lưu trữ mã xác thực.
    const expirationTime = Date.now() + 10 * 60 * 1000; // 10 phút tính từ lúc tạo mã

    // Lưu mã xác thực và thời gian hết hạn vào bộ nhớ tạm
    // Lưu thông tin mã xác thực cùng với thời gian hết hạn
    req.app.locals.verification = { 
      email, username, password, hashedCode, expirationTime 
    };
  
    // Gửi email với mã xác thực
    await sendVerificationEmail(email, verificationCode);
  
    return hashedCode; // Trả về mã xác thực để dùng khi xác minh
  };
  const verifyEmailAndCreateUser = async (req, userInputCode) => {
    
    const verification = req.app.locals.verification;
    if (!verification) {
      throw new Error("Không có mã xác thực lưu trữ.");
    }
    const { email, username, password, hashedCode, expirationTime } = verification;
    if (Date.now() > expirationTime) {
      delete req.app.locals.verification;
      throw new Error("Mã xác thực đã hết hạn.");
    }
    const isMatch = await bcrypt.compare(String(userInputCode), hashedCode);
    if (!isMatch) { 
      throw new Error("Mã xác thực không đúng.");
    }
    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({ username, email, password: hashedPassword });
  
    // Xóa mã xác thực khỏi bộ nhớ
    delete req.app.locals.verification;
  
    return newUser;
  };

const  loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Người dùng không tồn tại.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mật khẩu không đúng.");

    const token = jwt.sign(
        { 
            id: user.id, role: user.role 
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn: process.env.JWT_EXPIRES,
        }
    );
    

    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};
const sendNewPasswordEmail = async (email, newPassword) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // false vì dùng TLS (STARTTLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"HH MOVIE" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Mật khẩu mới từ HH MOVIE",
    html: `
      <p>Kính gửi Quý khách,</p>
      <p>Chúng tôi đã nhận được yêu cầu đổi mật khẩu cho tài khoản của bạn. Dưới đây là mật khẩu mới:</p>
      <p><strong>${newPassword}</strong></p>
      <p>Vui lòng sử dụng mật khẩu mới để đăng nhập vào tài khoản của bạn. Nếu bạn không yêu cầu thay đổi này, vui lòng liên hệ với chúng tôi ngay.</p>
      <p>Trân trọng,</p>
      <p>Đội ngũ hỗ trợ khách hàng<br/>[HH MOVIE]</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};
const changePasswordByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email không tồn tại.");

  // Tạo mật khẩu ngẫu nhiên (8 ký tự, gồm cả chữ và số)
  const newPassword = crypto.randomBytes(4).toString("hex");

  // Mã hóa mật khẩu mới
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Cập nhật mật khẩu mới vào cơ sở dữ liệu
  user.password = hashedNewPassword;
  await user.save();

  // Gửi mật khẩu mới qua email
  await sendNewPasswordEmail(email, newPassword);

  return { message: "Mật khẩu mới đã được gửi đến email của bạn." };
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmailAndCreateUser,
    changePasswordByEmail
  };