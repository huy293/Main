<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
ob_start();
include_once "../model/ServiceModel.php"; 

class ServiceController {
    private $serviceModel;

    public function __construct() {
        // Kiểm tra nếu chưa đăng nhập hoặc không phải admin, thì redirect
        // if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] != 'admin') {
        //     echo '<meta http-equiv="refresh" content="0;url=login.php">';
        //     exit();
        // }

        $this->serviceModel = new ServiceModel();
    }

    // Hiển thị danh sách dịch vụ
    public function listServices() {
        return $this->serviceModel->getAllServices();
    }
    
    // Xử lý thêm dịch vụ
    public function addService() {    
        $name = $_POST['name'] ?? '';
        $price = $_POST['price'] ?? 0;
        $duration = $_POST['duration'] ?? 0;
        $description = $_POST['description'] ?? '';
        $image = $_POST['image'] ?? null;
        if ($this->serviceModel->isServiceExists($name)) {
            echo "<script>
                    alert('Tên dịch vụ đã tồn tại! Vui lòng chọn tên khác.');
                     // Quay lại trang trước đó
                  </script>";
            exit();
        }
        if ($this->serviceModel->addService($name, $price, $duration, $description, $image)) {
            echo "<script>
                    document.addEventListener('DOMContentLoaded', function() {
                        loadPage('service.php?action=listServices');
                    });
                </script>";

        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi thêm dịch vụ"]);
        }
    }

    // Xử lý cập nhật dịch vụ
    public function updateService() {    
        $id = $_POST['id'] ?? 0;
        $name = $_POST['name'] ?? '';
        $price = $_POST['price'] ?? 0;
        $duration = $_POST['duration'] ?? 0;
        $description = $_POST['description'] ?? '';
        $image = $_POST['image'] ?? null;

        if ($this->serviceModel->updateService($id, $name, $price, $duration, $description, $image)) {
            echo "<script>
                    document.addEventListener('DOMContentLoaded', function() {
                        loadPage('service.php?action=listServices');
                    });
                </script>";
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi cập nhật dịch vụ"]);
        }
    }

    // Xử lý xóa dịch vụ
    public function deleteService() {    
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            if ($this->serviceModel->deleteService($id)) {
                echo json_encode(["success" => true]);
                exit();
            } else {
                echo json_encode(["success" => false, "message" => "Lỗi khi xóa dịch vụ"]);
                exit();
            }
        }
    }
}
?>
