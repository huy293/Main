<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/ScheduleModel.php';

class ScheduleController {
    private $scheduleModel;

    public function __construct() {
        $this->scheduleModel = new ScheduleModel();
    }

    // Lấy danh sách lịch làm việc
    public function getAllSchedules() {
        echo json_encode($this->scheduleModel->getAllSchedules());
        exit;
    }

    // Lấy lịch làm việc theo ID nhân viên
    public function getScheduleByStaff($staff_id) {
        echo json_encode($this->scheduleModel->getScheduleByStaff($staff_id));
        exit;
    }

    // Tạo lịch làm việc mới
    public function createSchedule() {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền thêm lịch làm việc']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $newId = $this->scheduleModel->createSchedule($data);
        echo json_encode(['status' => true, 'message' => 'Tạo lịch làm việc thành công', 'id' => $newId]);
        exit;
    }

    // Cập nhật lịch làm việc
    public function updateSchedule($id) {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền cập nhật lịch làm việc']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $updated = $this->scheduleModel->updateSchedule($id, $data);
        echo json_encode(['status' => true, 'message' => 'Cập nhật lịch làm việc thành công', 'rows_affected' => $updated]);
        exit;
    }

    // Vô hiệu hóa lịch làm việc
    public function disableSchedule($id) {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền vô hiệu hóa lịch làm việc']);
            exit;
        }

        $disabled = $this->scheduleModel->disableSchedule($id);
        echo json_encode(['status' => true, 'message' => 'Vô hiệu hóa lịch làm việc thành công', 'rows_affected' => $disabled]);
        exit;
    }
}
?>
