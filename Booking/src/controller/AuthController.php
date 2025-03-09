<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/config/database.php';
require_once '/var/www/html/config/OTPmail.php';
require_once '/var/www/html/model/AccountModel.php';

class AuthController {
    private $accountModel;

    public function __construct() {
        $this->accountModel = new AccountModel();
    }
    public function register() {        
        $username = isset($_POST['username']) ? trim($_POST['username']) : null;
        $password = isset($_POST['password']) ? trim($_POST['password']) : null;
        $name = isset($_POST['name']) ? trim($_POST['name']) : null;
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : null;
        $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    
        if (!$username || !$password || !$name || !$phone || !$email) {
            echo json_encode(['status' => false, 'message' => 'Vui lòng nhập đầy đủ thông tin']);
            exit;
        }
    
        // Kiểm tra username hoặc email đã tồn tại chưa
        if ($this->accountModel->usernameExists($username)) {
            echo json_encode(['status' => false, 'message' => 'Tên đăng nhập đã tồn tại']);
            exit;
        }
    
        if ($this->accountModel->emailExists($email)) {
            echo json_encode(['status' => false, 'message' => 'Email đã được sử dụng']);
            exit;
        }
    
        // Lưu thông tin đăng ký vào session
        $_SESSION['register_data'] = [
            'username' => $username,
            'password' => password_hash($password, PASSWORD_BCRYPT), // Mã hóa mật khẩu
            'name' => $name,
            'phone' => $phone,
            'email' => $email
        ];
    
        // Gửi OTP đến email
        if (!sendOTP($email)) {
            echo json_encode(['status' => false, 'message' => 'Không thể gửi OTP, vui lòng thử lại']);
            exit;
        }
    
        echo json_encode(['status' => true, 'message' => 'OTP đã được gửi đến email của bạn']);
        exit;
    }
    
    public function verifyOTP() {
        session_start();
    
        $email = isset($_POST['email']) ? trim($_POST['email']) : null;
        $otp = isset($_POST['otp']) ? trim($_POST['otp']) : null;
    
        if (!$email || !$otp) {
            echo json_encode(['status' => false, 'message' => 'Vui lòng nhập email và OTP']);
            exit;
        }
    
        // Kiểm tra OTP có đúng không
        if (!verifyOTP($email, $otp)) {
            echo json_encode(['status' => false, 'message' => 'Mã OTP không hợp lệ hoặc đã hết hạn']);
            exit;
        }
    
        // Kiểm tra session có lưu thông tin đăng ký không
        if (!isset($_SESSION['register_data']) || $_SESSION['register_data']['email'] !== $email) {
            echo json_encode(['status' => false, 'message' => 'Lỗi xác thực, vui lòng đăng ký lại']);
            exit;
        }
    
        // Lấy thông tin từ session
        $registerData = $_SESSION['register_data'];
        $username = $registerData['username'];
        $password = $registerData['password'];
        $name = $registerData['name'];
        $phone = $registerData['phone'];
        $role = 'Customer';
    
        // Tạo tài khoản
        $success = $this->accountModel->createAccount($username, $password, $name, $phone, $email, $role);
    
        if ($success) {
            unset($_SESSION['otp'][$email]); // Xóa OTP sau khi xác minh thành công
            unset($_SESSION['register_data']); // Xóa dữ liệu tạm
    
            echo json_encode(['status' => true, 'message' => 'Đăng ký thành công']);
        } else {
            echo json_encode(['status' => false, 'message' => 'Đăng ký thất bại, vui lòng thử lại']);
        }
        exit;
    }
    
    
    
    // Đăng nhập
    public function login() {
        $username = isset($_POST['username']) ? $_POST['username'] : null;
        $password = isset($_POST['password']) ? $_POST['password'] : null;
        var_dump($username, $password);

        if (!$username || !$password) {
            echo json_encode(['status' => false, 'message' => 'Vui lòng nhập tài khoản và mật khẩu']);
            exit;
        }
    
        $user = $this->accountModel->authenticate($username, $password);
    
        if ($user) {
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['is_logged_in'] = true;
    
            echo json_encode(['status' => true, 'message' => 'Đăng nhập thành công', 'user' => $user]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Sai tài khoản hoặc mật khẩu hoặc tài khoản bị vô hiệu hóa']);
        }
        exit;
    }

    // Đăng xuất
    public function logout() {
        session_unset();
        session_destroy();
        echo json_encode(['status' => true, 'message' => 'Đăng xuất thành công']);
        exit;
    }

    // Kiểm tra xem người dùng đã đăng nhập chưa
    public function isLoggedIn() {
        echo json_encode(['status' => isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true]);
        exit;
    }

    // Lấy thông tin người dùng đang đăng nhập
    public function getUser() {
        if (isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true) {
            echo json_encode([
                'status' => true,
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'username' => $_SESSION['username'],
                    'role' => $_SESSION['role']
                ]
            ]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Chưa đăng nhập']);
        }
        exit;
    }

    // Vô hiệu hóa tài khoản
    public function deactivateAccount($id) {
        if (!isset($_SESSION['is_logged_in']) || !$_SESSION['is_logged_in']) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        if ($_SESSION['role'] === 'Admin' || $_SESSION['user_id'] == $id) {
            $success = $this->accountModel->deactivateAccount($id);
            echo json_encode(['status' => $success, 'message' => $success ? 'Tài khoản đã bị vô hiệu hóa' : 'Không thể vô hiệu hóa tài khoản']);
        } else {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền vô hiệu hóa tài khoản này']);
        }
        exit;
    }

    // Kích hoạt lại tài khoản
    public function reactivateAccount($id) {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền kích hoạt lại tài khoản']);
            exit;
        }

        $success = $this->accountModel->reactivateAccount($id);
        echo json_encode(['status' => $success, 'message' => $success ? 'Tài khoản đã được kích hoạt lại' : 'Không thể kích hoạt lại tài khoản']);
        exit;
    }
}
?>
