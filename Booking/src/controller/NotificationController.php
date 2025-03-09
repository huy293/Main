<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/NotificationModel.php';

class NotificationController {
    private $notificationModel;

    public function __construct() {
        $this->notificationModel = new NotificationModel();
    }

    public function getAllNotifications() {
        echo json_encode($this->notificationModel->getAllNotifications());
        exit;
    }

    public function getNotificationByUser($user_id) {
        echo json_encode($this->notificationModel->getNotificationByUser($user_id));
        exit;
    }

    public function createNotification() {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền tạo thông báo']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $newId = $this->notificationModel->createNotification($data);
        echo json_encode(['status' => true, 'message' => 'Gửi thông báo thành công', 'id' => $newId]);
        exit;
    }

    public function disableNotification($id) {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền xóa thông báo']);
            exit;
        }

        $disabled = $this->notificationModel->disableNotification($id);
        echo json_encode(['status' => true, 'message' => 'Thông báo đã bị ẩn', 'rows_affected' => $disabled]);
        exit;
    }
}
?>
