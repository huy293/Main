<?php
require_once '/var/www/html/config/database.php';

class AccountModel {
    private $table = "account";
    private $conn;

    public function __construct() {
        $this->conn = database();
    }

    // Lấy tất cả tài khoản
    public function getAllAccounts() {
        $query = "SELECT * FROM " . $this->table;
        $result = $this->conn->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Lấy tài khoản theo ID
    public function getAccountById($id) {
        $query = "SELECT * FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    // Lấy tài khoản theo username
    public function getAccountByUsername($username) {
        $query = "SELECT * FROM " . $this->table . " WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);  
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    // Kiểm tra username đã tồn tại chưa
    public function usernameExists($username) {
        $query = "SELECT id FROM " . $this->table . " WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        return $stmt->get_result()->num_rows > 0;
    }
    public function emailExists($email) {
        $query = "SELECT id FROM " . $this->table . " WHERE email = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        return $stmt->get_result()->num_rows > 0;
    }
    
    // Thêm tài khoản mới
    public function createAccount($username, $password, $name, $phone, $email, $role = 'Customer') {
        $query = "INSERT INTO " . $this->table . " (username, pad, name, phone, email, role, status) 
                  VALUES (?, ?, ?, ?, ?, ?, 'Active')";
        $stmt = $this->conn->prepare($query);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bind_param("ssssss", $username, $hashedPassword, $name, $phone, $email, $role);
        return $stmt->execute();
    }

    // Cập nhật thông tin tài khoản
    public function updateAccount($id, $name, $phone, $email, $role) {
        $query = "UPDATE " . $this->table . " SET name = ?, phone = ?, email = ?, role = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssssi", $name, $phone, $email, $role, $id);
        return $stmt->execute();
    }

    // Vô hiệu hóa tài khoản (Đánh dấu chứ không xóa ngay)
    public function deactivateAccount($id) {
        $query = "UPDATE " . $this->table . " SET status = 'Inactive' WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    // Kích hoạt lại tài khoản
    public function reactivateAccount($id) {
        $query = "UPDATE " . $this->table . " SET status = 'Active' WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }

    // Xác thực tài khoản (Chỉ đăng nhập nếu tài khoản đang "Active")
    public function authenticate($username, $password) {
        $user = $this->getAccountByUsername($username);
    
        if (!$user) {
            return false; // Không tìm thấy tài khoản
        }    
        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
        if (!password_verify($password, $user['pad'])) {
            return false; // Sai mật khẩu
        }
    
        return $user; // Đăng nhập thành công
    }
    

    
    

    // Tìm kiếm tài khoản theo role, keyword hoặc status
    public function searchAccounts($role = null, $keyword = null, $status = null) {
        $query = "SELECT * FROM " . $this->table . " WHERE 1=1";
        $params = [];
        $types = "";

        if (!empty($role)) {
            $query .= " AND role = ?";
            $params[] = $role;
            $types .= "s";
        }

        if (!empty($keyword)) {
            $query .= " AND (username LIKE ? OR name LIKE ?)";
            $keyword = "%$keyword%";
            $params[] = $keyword;
            $params[] = $keyword;
            $types .= "ss";
        }

        if (!empty($status)) {
            $query .= " AND status = ?";
            $params[] = $status;
            $types .= "s";
        }

        $stmt = $this->conn->prepare($query);
        if (!empty($params)) {
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}
?>
