<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/StaffModel.php';

class StaffController {
    private $staffModel;

    public function __construct() {
        $this->staffModel = new StaffModel();
    }

    // Lấy danh sách nhân viên
    public function getAllStaff() {
        $staff = $this->staffModel->getAllStaff();
        echo json_encode(['status' => true, 'data' => $staff]);
        exit;
    }

    // Lấy thông tin nhân viên theo ID
    public function getStaffById($id) {
        $staff = $this->staffModel->getStaffById($id);
        if ($staff) {
            echo json_encode(['status' => true, 'data' => $staff]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Không tìm thấy nhân viên']);
        }
        exit;
    }

    // Thêm nhân viên mới
    public function createStaff() {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền thêm nhân viên']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->staffModel->createStaff($data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Thêm nhân viên thành công' : 'Lỗi khi thêm nhân viên']);
        exit;
    }

    // Cập nhật thông tin nhân viên
    public function updateStaff($id) {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền chỉnh sửa thông tin nhân viên']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->staffModel->updateStaff($id, $data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Cập nhật nhân viên thành công' : 'Lỗi khi cập nhật nhân viên']);
        exit;
    }

    // Vô hiệu hóa nhân viên
    public function disableStaff($id) {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền vô hiệu hóa nhân viên']);
            exit;
        }

        $success = $this->staffModel->disableStaff($id);
        echo json_encode(['status' => $success, 'message' => $success ? 'Nhân viên đã bị vô hiệu hóa' : 'Lỗi khi vô hiệu hóa nhân viên']);
        exit;
    }
}
?>
