<?php
require_once '/var/www/html/config/database.php';

class ReviewModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getReviewsByService($service_id) {
        $query = "SELECT * FROM review WHERE service_id = :service_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':service_id', $service_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createReview($data) {
        $query = "INSERT INTO review (customer_id, service_id, rating, comment) VALUES (:customer_id, :service_id, :rating, :comment)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }
}
