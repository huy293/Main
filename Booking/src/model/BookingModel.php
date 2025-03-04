<?php
// Trong file user.php
include_once '../model/connect.php';

class BookingModel {
    private $conn;

    public function __construct() {
        $this->conn = connect();
    }

    public function getAllBookings() {
        $sql = "SELECT b.id, b.username, s.name AS service_name, a.name AS staff_name, 
                       b.date_founded, b.time_book, b.Note, b.Status 
                FROM booking b
                JOIN service s ON b.service_id = s.id
                JOIN staff st ON b.staff_id = st.id
                JOIN account a ON st.account_id = a.id";
        $result = $this->conn->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    
    // Cập nhật trạng thái lịch hẹn
    public function updateBookingStatus($id, $status) {
        $sql = "UPDATE booking SET Status = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("si", $status, $id);
        return $stmt->execute();
    }

    // Xóa lịch hẹn
    public function deleteBooking($id) {
        $sql = "DELETE FROM booking WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>
