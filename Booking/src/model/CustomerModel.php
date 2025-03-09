<?php
require_once '/var/www/html/config/database.php';

class CustomerModel {
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    // Lấy danh sách khách hàng (chỉ lấy khách hàng có trạng thái khác 'Inactive')
    public function getAllCustomers() {
        $query = "SELECT * FROM customers WHERE status != 'Inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Lấy thông tin khách hàng theo ID
    public function getCustomerById($id) {
        $query = "SELECT * FROM customers WHERE id = :id AND status != 'Inactive'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Thêm khách hàng mới
    public function createCustomer($data) {
        $query = "INSERT INTO customers (account_id, phone_number, full_name, email, status) 
                  VALUES (:account_id, :phone_number, :full_name, :email, 'Active')";
        $stmt = $this->conn->prepare($query);
        $stmt->execute($data);
        return $this->conn->lastInsertId();
    }

    // Cập nhật thông tin khách hàng
    public function updateCustomer($id, $data) {
        $query = "UPDATE customers SET phone_number = :phone_number, full_name = :full_name, email = :email 
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute($data);
        return $stmt->rowCount();
    }

    // Vô hiệu hóa khách hàng
    public function disableCustomer($id) {
        $query = "UPDATE customers SET status = 'Inactive' WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount();
    }
}
?>
