<?php
// Hàm kết nối database
function connect() {
    $host = "mysql"; // tên service của MySQL trong docker-compose.yml
    $user = "barber";
    $password = "barber_pass"; // Mật khẩu MySQL đã thiết lập trong docker-compose.yml
    $database = "barber_management";

    // Kết nối với MySQLi
    $conn = new mysqli($host, $user, $password, $database);

    // Kiểm tra kết nối
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function createDatabaseAndTables() {
    $conn = connect();

    // Tạo database nếu chưa tồn tại
    $conn->query("CREATE DATABASE IF NOT EXISTS barber_management");
    $conn->select_db('barber_management');  // Chọn database

    // Tạo bảng account
    $createAccountTable = "
    CREATE TABLE IF NOT EXISTS account (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,  
        pad VARCHAR(255) NOT NULL,       
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100),                  
        role ENUM('Admin', 'Customer', 'Staff') NOT NULL,  
        avatar VARCHAR(255),  
        social_login ENUM('Google', 'Facebook', 'Phone', 'Email') DEFAULT 'Email',  
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
    );
    ";
    $conn->query($createAccountTable);

    // Tạo bảng staff
    $createStaffTable = "
    CREATE TABLE IF NOT EXISTS staff (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,  
        phone_number VARCHAR(20) NOT NULL,
        gender ENUM('Male', 'Female') NOT NULL,
        salary DECIMAL(10, 2) NOT NULL,
        date_of_birth DATE,
        status ENUM('Active', 'Inactive', 'On leave') DEFAULT 'Active',
        shift ENUM('9:00-13:00', '13:00-21:00') NOT NULL,
        FOREIGN KEY (account_id) REFERENCES account(id)
    );
    ";
    $conn->query($createStaffTable);
    // Bảng lịch làm việc
    $createScheduleTable ="
    CREATE TABLE IF NOT EXISTS schedule (
        id INT AUTO_INCREMENT PRIMARY KEY,
        staff_id INT NOT NULL,
        work_date DATE NOT NULL,
        shift ENUM('9:00-13:00', '13:00-21:00') NOT NULL,
        status ENUM('assigned', 'confirmed', 'absent', 'completed') DEFAULT 'assigned',
        FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
    );
    ";
    $conn->query($createScheduleTable);
    // Chấm công
    $createAttendance = "
    CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        staff_id INT NOT NULL,
        work_date DATE NOT NULL,
        check_in TIME,
        check_out TIME,
        status ENUM('Present', 'Late', 'Absent', 'Leave') DEFAULT 'Present',
        FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
    );
    ";
    $conn->query($createAttendance);
    // Tạo bảng dịch vụ
    $createServiceTable = "
    CREATE TABLE IF NOT EXISTS service (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        price DECIMAL(10,2) NOT NULL,
        duration INT NOT NULL,
        description TEXT,
        service_image VARCHAR(255)
    );
    ";
    $conn->query($createServiceTable);

    // Tạo bảng booking
    $createBookingTable = "
    CREATE TABLE IF NOT EXISTS booking (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        staff_id INT NOT NULL,
        service_id INT NOT NULL,
        date_founded DATE NOT NULL,
        time_book TIME NOT NULL,
        Note TEXT,
        Status ENUM('Đã hoàn thành', 'Chờ', 'Đã hủy') DEFAULT 'Chờ',
        FOREIGN KEY (username) REFERENCES account(username),
        FOREIGN KEY (staff_id) REFERENCES staff(id),
        FOREIGN KEY (service_id) REFERENCES service(id)
    );
    ";
    $conn->query($createBookingTable);


    // Tạo bảng đánh giá
    $createReviewTable = "
    CREATE TABLE IF NOT EXISTS review (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        staff_id INT NOT NULL,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES account(username),
        FOREIGN KEY (staff_id) REFERENCES staff(id)
    );
    ";
    $conn->query($createReviewTable);

    // Tạo bảng thông báo
    $createNotificationTable = "
    CREATE TABLE IF NOT EXISTS notification (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        type ENUM('Email', 'SMS', 'Push') NOT NULL,
        status ENUM('Đã gửi', 'Chưa gửi') DEFAULT 'Chưa gửi',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES account(username)
    );
    ";
    $conn->query($createNotificationTable);

    // Tạo bảng khách hàng
    $createCustomerTable = "
    CREATE TABLE IF NOT EXISTS customer (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id INT NOT NULL,  -- Tham chiếu đến tài khoản trong bảng account
        address VARCHAR(255),
        date_of_birth DATE,
        gender ENUM('Male', 'Female', 'Other'),
        FOREIGN KEY (account_id) REFERENCES account(id)
    );
    ";
    $conn->query($createCustomerTable);

}

// Chèn dữ liệu mẫu
function insertSampleData() {
    $conn = connect();

    // Kiểm tra và thêm tài khoản
    $result = $conn->query("SELECT COUNT(*) as count FROM account");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO account (username, pad, name, phone, email, role) VALUES
            ('admin', 'admin123', 'Admin User', '0123456789', 'admin@example.com', 'Admin'),
            ('staff1', 'staff123', 'John Doe', '0987654321', 'staff1@example.com', 'Staff'),
            ('staff2', 'staff456', 'David Smith', '0978654321', 'staff2@example.com', 'Staff'),
            ('customer1', 'customer123', 'Jane Doe', '0975312648', 'customer1@example.com', 'Customer'),
            ('customer2', 'customer456', 'Michael Johnson', '0964537281', 'customer2@example.com', 'Customer')");
    }

    // Kiểm tra và thêm nhân viên
    $result = $conn->query("SELECT COUNT(*) as count FROM staff");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO staff (account_id, phone_number, gender, salary, date_of_birth, status, shift) VALUES
            (2, '0987654321', 'Male', 5000.00, '1990-05-15', 'Active', '9:00-13:00'),
            (3, '0978654321', 'Male', 5200.00, '1992-07-20', 'Active', '13:00-21:00')");
    }

    // Kiểm tra và thêm khách hàng
    $result = $conn->query("SELECT COUNT(*) as count FROM customer");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO customer (account_id, address, date_of_birth, gender) VALUES
            (4, '123 Main St', '1995-08-20', 'Female'),
            (5, '456 Elm St', '1993-10-11', 'Male')");
    }

    // Kiểm tra và thêm dịch vụ
    $result = $conn->query("SELECT COUNT(*) as count FROM service");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO service (name, price, duration, description) VALUES
            ('Cắt tóc nam', 100.00, 30, 'Dịch vụ cắt tóc nam chuyên nghiệp'),
            ('Cạo râu', 50.00, 15, 'Dịch vụ cạo râu cao cấp')");
    }

    // Kiểm tra và thêm lịch hẹn
    $result = $conn->query("SELECT COUNT(*) as count FROM booking");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO booking (username, staff_id, service_id, date_founded, time_book, status) VALUES
            ('customer1', 1, 1, '2025-02-26', '10:00:00', 'Chờ'),
            ('customer2', 2, 2, '2025-02-27', '14:30:00', 'Chờ')");
    }

    // Kiểm tra và thêm đánh giá
    $result = $conn->query("SELECT COUNT(*) as count FROM review");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO review (username, staff_id, rating, comment) VALUES
            ('customer1', 1, 5, 'Dịch vụ rất tốt!'),
            ('customer2', 2, 4, 'Ổn nhưng có thể cải thiện.')");
    }

    // Kiểm tra và thêm thông báo
    $result = $conn->query("SELECT COUNT(*) as count FROM notification");
    $row = $result->fetch_assoc();
    if ($row['count'] == 0) {
        $conn->query("INSERT INTO notification (username, message, type, status) VALUES
            ('customer1', 'Lịch hẹn của bạn đã được xác nhận!', 'Email', 'Đã gửi'),
            ('customer2', 'Lịch hẹn của bạn sắp đến!', 'SMS', 'Chưa gửi')");
    }
}

// Gọi hàm để tự động tạo database và bảng khi khởi động
createDatabaseAndTables();
// Gọi hàm để chèn dữ liệu mẫu
insertSampleData();
?>