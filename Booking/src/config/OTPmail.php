<?php
// Bật session nếu chưa có
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Nạp thư viện PHPMailer
require '/var/www/html/PHPMailer/src/PHPMailer.php';
require '/var/www/html/PHPMailer/src/SMTP.php';
require '/var/www/html/PHPMailer/src/Exception.php';



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Hàm tạo mã OTP ngẫu nhiên
function generateOTP($length = 6) {
    return str_pad(rand(0, pow(10, $length) - 1), $length, '0', STR_PAD_LEFT);
}

// Hàm gửi OTP qua email
function sendOTP($email) {
    $otp = generateOTP();
    
    // Lưu OTP vào session với thời gian hết hạn
    $_SESSION['otp'][$email] = [
        'code' => $otp,
        'expires' => time() + 300 // 5 phút
    ];

    // Cấu hình gửi email
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'luuhuy.290303@gmail.com'; // Gmail của bạn
        $mail->Password = 'fnkf mpcx echm yjry';   // Mật khẩu ứng dụng
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Thiết lập email
        $mail->setFrom('luuhuy.290303@gmail.com', 'Huy Hair');
        $mail->addAddress($email);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = "Mã xác thực OTP";
        $mail->Body = "Mã OTP của bạn là: $otp. Mã này có hiệu lực trong 5 phút.";

        // Gửi email
        $mail->send();
        return ['success' => true, 'message' => 'OTP đã được gửi đến email của bạn.'];
    } catch (Exception $e) {
        return ['success' => false, 'message' => "Lỗi gửi email: {$mail->ErrorInfo}"];
    }
}

// Hàm kiểm tra OTP hợp lệ
function verifyOTP($email, $otp) {
    if (!isset($_SESSION['otp'][$email])) {
        return false;
    }

    $storedOtp = $_SESSION['otp'][$email];
    if ($storedOtp['code'] === $otp && $storedOtp['expires'] > time()) {
        unset($_SESSION['otp'][$email]); // Xóa OTP sau khi xác thực thành công
        return true;
    }
    return false;
}
?>
