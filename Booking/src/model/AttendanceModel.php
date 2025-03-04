<?php
include_once '../model/connect.php';
class AttendanceModel {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    // 🔹 Ghi nhận chấm công
    public function addAttendance($staff_id, $work_date, $check_in = null, $check_out = null, $status = 'Present') {
        $sql = "INSERT INTO attendance (staff_id, work_date, check_in, check_out, status) VALUES (?, ?, ?, ?, ?)";
        return $this->execute($sql, [$staff_id, $work_date, $check_in, $check_out, $status]);
    }

    // 🔹 Lấy danh sách chấm công
    public function getAllAttendance() {
        return $this->fetchAll("SELECT * FROM attendance");
    }

    // 🔹 Lấy chấm công theo nhân viên
    public function getAttendanceByStaff($staff_id) {
        return $this->fetchAll("SELECT * FROM attendance WHERE staff_id = ?", [$staff_id]);
    }

    // 🔹 Cập nhật giờ check-in / check-out
    public function updateAttendance($id, $check_in, $check_out, $status) {
        $sql = "UPDATE attendance SET check_in = ?, check_out = ?, status = ? WHERE id = ?";
        return $this->execute($sql, [$check_in, $check_out, $status, $id]);
    }

    // 🔹 Xóa dữ liệu chấm công
    public function deleteAttendance($id) {
        return $this->execute("DELETE FROM attendance WHERE id = ?", [$id]);
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
