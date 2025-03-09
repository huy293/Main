<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/ServiceModel.php';

class ServiceController {
    private $serviceModel;

    public function __construct() {
        $this->serviceModel = new ServiceModel();
    }

    // Lấy danh sách dịch vụ
    public function getAllServices() {
        $services = $this->serviceModel->getAllServices();
        echo json_encode(['status' => true, 'data' => $services]);
        exit;
    }

    // Lấy dịch vụ theo ID
    public function getServiceById($id) {
        $service = $this->serviceModel->getServiceById($id);
        if ($service) {
            echo json_encode(['status' => true, 'data' => $service]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Không tìm thấy dịch vụ']);
        }
        exit;
    }

    // Thêm dịch vụ mới
    public function createService() {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền thêm dịch vụ']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->serviceModel->createService($data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Thêm dịch vụ thành công' : 'Lỗi khi thêm dịch vụ']);
        exit;
    }

    // Cập nhật dịch vụ
    public function updateService($id) {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền chỉnh sửa dịch vụ']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->serviceModel->updateService($id, $data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Cập nhật dịch vụ thành công' : 'Lỗi khi cập nhật dịch vụ']);
        exit;
    }

    // Vô hiệu hóa dịch vụ
    public function disableService($id) {
        if (!isset($_SESSION['is_logged_in']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền vô hiệu hóa dịch vụ']);
            exit;
        }

        $success = $this->serviceModel->disableService($id);
        echo json_encode(['status' => $success, 'message' => $success ? 'Dịch vụ đã bị vô hiệu hóa' : 'Lỗi khi vô hiệu hóa dịch vụ']);
        exit;
    }
}
?>
