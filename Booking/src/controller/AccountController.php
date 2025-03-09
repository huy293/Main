<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/config/database.php';
require_once '/var/www/html/model/AccountModel.php';

class AccountController {
    private $accountModel;

    public function __construct() {
        $this->accountModel = new AccountModel();
    }

    // Lấy danh sách tất cả tài khoản (chỉ Admin mới có quyền)
    public function getAllAccounts() {
        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền truy cập']);
            exit;
        }
        
        $accounts = $this->accountModel->getAllAccounts();
        echo json_encode(['status' => true, 'accounts' => $accounts]);
        exit;
    }

    // Lấy thông tin tài khoản dựa trên ID
    public function getAccountById($id) {
        if (!isset($_SESSION['is_logged_in']) || !$_SESSION['is_logged_in']) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $account = $this->accountModel->getAccountById($id);
        if ($account) {
            echo json_encode(['status' => true, 'account' => $account]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Không tìm thấy tài khoản']);
        }
        exit;
    }

    // Cập nhật thông tin tài khoản
    public function updateAccount() {
        if (!isset($_SESSION['is_logged_in']) || !$_SESSION['is_logged_in']) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id']) || !isset($data['username']) || !isset($data['email'])) {
            echo json_encode(['status' => false, 'message' => 'Thiếu thông tin cập nhật']);
            exit;
        }

        // Kiểm tra quyền: Admin có thể cập nhật mọi tài khoản, user chỉ có thể cập nhật tài khoản của chính mình
        if ($_SESSION['role'] !== 'Admin' && $_SESSION['user_id'] != $data['id']) {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền cập nhật tài khoản này']);
            exit;
        }

        $success = $this->accountModel->updateAccount($data);
        echo json_encode(['status' => $success, 'message' => $success ? 'Cập nhật thành công' : 'Cập nhật thất bại']);
        exit;
    }

    // Đổi mật khẩu
    public function changePassword() {
        if (!isset($_SESSION['is_logged_in']) || !$_SESSION['is_logged_in']) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['old_password']) || !isset($data['new_password'])) {
            echo json_encode(['status' => false, 'message' => 'Thiếu thông tin đổi mật khẩu']);
            exit;
        }

        $userId = $_SESSION['user_id'];
        $success = $this->accountModel->changePassword($userId, $data['old_password'], $data['new_password']);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Đổi mật khẩu thành công' : 'Mật khẩu cũ không đúng']);
        exit;
    }

    // Vô hiệu hóa tài khoản (Chỉ Admin hoặc chính user có thể vô hiệu hóa)
    public function deactivateAccount($id) {
        if (!isset($_SESSION['is_logged_in']) || !$_SESSION['is_logged_in']) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        if ($_SESSION['role'] !== 'Admin' && $_SESSION['user_id'] != $id) {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền vô hiệu hóa tài khoản này']);
            exit;
        }

        $success = $this->accountModel->deactivateAccount($id);
        echo json_encode(['status' => $success, 'message' => $success ? 'Tài khoản đã bị vô hiệu hóa' : 'Không thể vô hiệu hóa tài khoản']);
        exit;
    }

    // Kích hoạt tài khoản (Chỉ Admin có quyền)
    public function reactivateAccount($id) {
        if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền kích hoạt tài khoản']);
            exit;
        }

        $success = $this->accountModel->reactivateAccount($id);
        echo json_encode(['status' => $success, 'message' => $success ? 'Tài khoản đã được kích hoạt' : 'Không thể kích hoạt tài khoản']);
        exit;
    }
}
?>
