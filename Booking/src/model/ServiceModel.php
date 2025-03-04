<?php
include_once '../model/connect.php';

class ServiceModel {
    private $conn;

    public function __construct() {
        $this->conn = connect();
    }

    public function getAllServices() {
        $sql = "SELECT * FROM service";
        $result = $this->conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    public function isServiceExists($name) {
        $query = "SELECT COUNT(*) FROM service WHERE name = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $name);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
        
        return $count > 0; // Trả về true nếu đã tồn tại
    }
    
    public function addService($name, $price, $duration, $description, $image) {
        $stmt = $this->conn->prepare("INSERT INTO service (name, price, duration, description, service_image) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sdiss", $name, $price, $duration, $description, $image);
        return $stmt->execute();
    }

    public function updateService($id, $name, $price, $duration, $description, $image) {
        $stmt = $this->conn->prepare("UPDATE service SET name=?, price=?, duration=?, description=?, service_image=? WHERE id=?");
        $stmt->bind_param("sdissi", $name, $price, $duration, $description, $image, $id);
        return $stmt->execute();
    }

    public function deleteService($id) {
        $stmt = $this->conn->prepare("DELETE FROM service WHERE id = ?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>

