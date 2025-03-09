<?php
require_once '/var/www/html/config/database.php';

class ServiceModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getAllServices() {
        $query = "SELECT * FROM service WHERE status != 'inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getServiceById($id) {
        $query = "SELECT * FROM service WHERE id = :id AND status != 'inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function createService($data) {
        $query = "INSERT INTO service (name, price, duration, status) VALUES (:name, :price, :duration, 'active')";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }

    public function updateService($id, $data) {
        $query = "UPDATE service SET name = :name, price = :price, duration = :duration WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute($data);
        return $stmt->rowCount();
    }

    public function disableService($id) {
        $query = "UPDATE service SET status = 'inactive' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount();
    }
}
