<?php
include_once '../model/connect.php';
class ScheduleModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // 🔹 Thêm lịch làm việc
    public function addSchedule($staff_id, $work_date, $shift, $status = 'assigned') {
        $sql = "INSERT INTO schedule (staff_id, work_date, shift, status) VALUES (?, ?, ?, ?)";
        return $this->execute($sql, [$staff_id, $work_date, $shift, $status]);
    }

    // 🔹 Lấy danh sách lịch làm việc
    public function getAllSchedules() {
        return $this->fetchAll("SELECT * FROM schedule");
    }

    // 🔹 Lấy lịch theo nhân viên
    public function getScheduleByStaff($staff_id) {
        return $this->fetchAll("SELECT * FROM schedule WHERE staff_id = ?", [$staff_id]);
    }

    // 🔹 Cập nhật trạng thái lịch
    public function updateScheduleStatus($id, $status) {
        return $this->execute("UPDATE schedule SET status = ? WHERE id = ?", [$status, $id]);
    }

    // 🔹 Xóa lịch làm việc (sẽ tự động xóa nếu nhân viên bị xóa do `ON DELETE CASCADE`)
    public function deleteSchedule($id) {
        return $this->execute("DELETE FROM schedule WHERE id = ?", [$id]);
    }

    private function execute($sql, $params = []) {
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    private function fetchAll($sql, $params = []) {
        $stmt = $this->execute($sql, $params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
