<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/CustomerModel.php';

class CustomerController {
    private $customerModel;

    public function __construct() {
        $this->customerModel = new CustomerModel();
    }

    // Lấy danh sách khách hàng
    public function getAllCustomers() {
        $customers = $this->customerModel->getAllCustomers();
        echo json_encode(['status' => true, 'data' => $customers]);
        exit;
    }

    // Lấy khách hàng theo ID
    public function getCustomerById($id) {
        $customer = $this->customerModel->getCustomerById($id);
        if ($customer) {
            echo json_encode(['status' => true, 'data' => $customer]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Không tìm thấy khách hàng']);
        }
        exit;
    }

    // Cập nhật thông tin khách hàng
    public function updateCustomer($id) {
        if (!isset($_SESSION['is_logged_in'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->customerModel->updateCustomer($id, $data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Cập nhật khách hàng thành công' : 'Lỗi khi cập nhật khách hàng']);
        exit;
    }
}
?>
