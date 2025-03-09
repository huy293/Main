<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/AttendanceModel.php';

class AttendanceController {
    private $attendanceModel;

    public function __construct() {
        $this->attendanceModel = new AttendanceModel();
    }

    public function getAllAttendances() {
        echo json_encode($this->attendanceModel->getAllAttendances());
        exit;
    }

    public function getAttendanceByStaff($staff_id) {
        echo json_encode($this->attendanceModel->getAttendanceByStaff($staff_id));
        exit;
    }

    public function recordAttendance() {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền chấm công']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $newId = $this->attendanceModel->recordAttendance($data);
        echo json_encode(['status' => true, 'message' => 'Chấm công thành công', 'id' => $newId]);
        exit;
    }

    public function updateAttendance($id) {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền cập nhật chấm công']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $updated = $this->attendanceModel->updateAttendance($id, $data);
        echo json_encode(['status' => true, 'message' => 'Cập nhật chấm công thành công', 'rows_affected' => $updated]);
        exit;
    }
}
?>
