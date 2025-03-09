<?php
require_once '/var/www/html/config/database.php';

class BookingModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getAllBookings() {
        $query = "SELECT * FROM booking WHERE status != 'cancelled'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookingById($id) {
        $query = "SELECT * FROM booking WHERE id = :id AND status != 'cancelled'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createBooking($data) {
        $query = "INSERT INTO booking (customer_id, staff_id, service_id, date, time, status) 
                  VALUES (:customer_id, :staff_id, :service_id, :date, :time, 'pending')";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }

    public function updateBooking($id, $data) {
        $query = "UPDATE booking SET staff_id = :staff_id, service_id = :service_id, date = :date, time = :time WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute($data);
        return $stmt->rowCount();
    }

    public function cancelBooking($id) {
        $query = "UPDATE booking SET status = 'cancelled' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount();
    }
}
