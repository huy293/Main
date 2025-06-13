const generateRandomPassword = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  // Đảm bảo có ít nhất một ký tự viết hoa, một số và một ký tự đặc biệt
  password += charset.match(/[A-Z]/)[0]; // Một chữ hoa
  password += charset.match(/[0-9]/)[0]; // Một số
  password += charset.match(/[!@#$%^&*]/)[0]; // Một ký tự đặc biệt
  
  // Thêm các ký tự ngẫu nhiên cho đến khi đạt độ dài yêu cầu
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  // Xáo trộn mật khẩu
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

module.exports = {
  generateRandomPassword
}; 