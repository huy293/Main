<?php
require_once '/var/www/html/config/database.php';

class StaffModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getAllStaff() {
        $query = "SELECT staff.*, account.name 
          FROM staff 
          JOIN account ON staff.account_id = account.id 
          WHERE staff.status != 'Inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->get_result();

        return $result->fetch_all(MYSQLI_ASSOC);
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
        $query = "UPDATE staff SET phone_number = ?, gender = ?, salary = ?, date_of_birth = ?, shift = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssissi", 
            $data['phone_number'], 
            $data['gender'], 
            $data['salary'], 
            $data['date_of_birth'], 
            $data['shift'], 
            $id
        );
        return $success = $stmt->execute();
    }
    

    public function disableStaff($id) {
        $query = "UPDATE staff SET status = 'Inactive' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
