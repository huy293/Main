<?php
require_once '/var/www/html/config/database.php';

class ScheduleModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getAllSchedules() {
        $query = "SELECT * FROM schedule WHERE status != 'completed'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getScheduleById($id) {
        $query = "SELECT * FROM schedule WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createSchedule($data) {
        $query = "INSERT INTO schedule (staff_id, work_date, shift, status) 
                  VALUES (:staff_id, :work_date, :shift, 'assigned')";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }

    public function updateSchedule($id, $data) {
        $query = "UPDATE schedule SET work_date = :work_date, shift = :shift, status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute($data);
        return $stmt->rowCount();
    }

    public function completeSchedule($id) {
        $query = "UPDATE schedule SET status = 'completed' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount();
    }
}
