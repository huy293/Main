<?php
require_once '/var/www/html/config/database.php';

class AttendanceModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getAllAttendance() {
        $query = "SELECT * FROM attendance";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAttendanceByStaff($staff_id) {
        $query = "SELECT * FROM attendance WHERE staff_id = :staff_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':staff_id', $staff_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function markAttendance($data) {
        $query = "INSERT INTO attendance (staff_id, date, status) VALUES (:staff_id, :date, :status)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }
}