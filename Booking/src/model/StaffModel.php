<?php
require_once '/var/www/html/config/database.php';

class StaffModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getAllStaff() {
        $query = "SELECT * FROM staff WHERE status != 'Inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getStaffById($id) {
        $query = "SELECT * FROM staff WHERE id = :id AND status != 'Inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createStaff($data) {
        $query = "INSERT INTO staff (account_id, phone_number, gender, salary, date_of_birth, status, shift) 
                  VALUES (:account_id, :phone_number, :gender, :salary, :date_of_birth, 'Active', :shift)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute($data);
    }

    public function updateStaff($id, $data) {
        $query = "UPDATE staff SET phone_number = :phone_number, gender = :gender, salary = :salary, 
                  date_of_birth = :date_of_birth, shift = :shift WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute($data);
    }

    public function disableStaff($id) {
        $query = "UPDATE staff SET status = 'Inactive' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
