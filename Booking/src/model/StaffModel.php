<?php
include_once '../model/connect.php';

class StaffModel {
    private $conn;

    public function __construct() {
        $this->conn = connect(); // Kết nối database bằng MySQLi
    }

    // Hàm hỗ trợ lấy dữ liệu nhiều dòng
    private function fetchAll($query, $params = []) {
        $stmt = $this->conn->prepare($query);
        if (!empty($params)) {
            $stmt->bind_param(str_repeat('s', count($params)), ...$params);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Hàm hỗ trợ lấy một dòng dữ liệu
    private function fetchOne($query, $params = []) {
        $stmt = $this->conn->prepare($query);
        if (!empty($params)) {
            $stmt->bind_param(str_repeat('s', count($params)), ...$params);
        }
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_assoc();
    }

    // Hàm hỗ trợ thực thi truy vấn (INSERT, UPDATE, DELETE)
    private function execute($query, $params = []) {
        $stmt = $this->conn->prepare($query);
        if (!empty($params)) {
            $stmt->bind_param(str_repeat('s', count($params)), ...$params);
        }
        return $stmt->execute();
    }

    // 🔹 Lấy danh sách nhân viên
    public function getAllStaff() {
        return $this->fetchAll("SELECT s.*, a.username FROM staff s INNER JOIN account a ON s.account_id = a.id");
    }

    // 🔹 Thêm nhân viên mới
    public function addStaff($account_id, $phone, $gender, $salary, $dob, $shift) {
        return $this->execute(
            "INSERT INTO staff (account_id, phone_number, gender, salary, date_of_birth, shift) VALUES (?, ?, ?, ?, ?, ?)", 
            [$account_id, $phone, $gender, $salary, $dob, $shift]
        );
    }

    // 🔹 Cập nhật thông tin nhân viên
    public function updateStaff($id, $phone, $gender, $salary, $dob, $shift) {
        return $this->execute(
            "UPDATE staff SET phone_number = ?, gender = ?, salary = ?, date_of_birth = ?, shift = ? WHERE id = ?",
            [$phone, $gender, $salary, $dob, $shift, $id]
        );
    }

    // 🔹 Xóa nhân viên
    public function deleteStaff($id) {
        $account_id = $this->fetchColumn("SELECT account_id FROM staff WHERE id = ?", [$id]);

        if ($account_id) {
            // Xóa nhân viên
            $this->execute("DELETE FROM staff WHERE id = ?", [$id]);
            // Xóa tài khoản
            $this->execute("DELETE FROM account WHERE id = ?", [$account_id]);
            
            return true;
        }

        return false;
    }
}
?>
