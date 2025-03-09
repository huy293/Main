<?php
require_once '/var/www/html/config/database.php';

class NotificationModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    public function getNotificationsByUser($user_id) {
        $query = "SELECT * FROM notification WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createNotification($data) {
        $query = "INSERT INTO notification (user_id, message) VALUES (:user_id, :message)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }
}
