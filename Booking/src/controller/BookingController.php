<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
ob_start();
include_once "../model/BookingModel.php";

class BookingController {
    private $bookingModel;

    public function __construct() {
        // Kiểm tra nếu chưa đăng nhập hoặc không phải admin, thì redirect
        // if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] != 'admin') {
        //     echo '<meta http-equiv="refresh" content="0;url=login.php">';
        //     exit();
        // }
        
        $this->bookingModel = new BookingModel();
    }

    // Hiển thị danh sách lịch hẹn
    public function listBookings() {
        return $this->bookingModel->getAllBookings();  // Trả về danh sách đặt lịch
    }
    

    // Cập nhật trạng thái lịch hẹn
    public function updateStatus() {
        if (isset($_POST['id']) && isset($_POST['status'])) {
            $id = $_POST['id'];
            $status = $_POST['status'];

            if ($this->bookingModel->updateBookingStatus($id, $status)) {
                echo json_encode(["success" => true]);
                exit();
            } else {
                echo json_encode(["success" => false, "message" => "Lỗi khi cập nhật"]);
                exit();
            }
        }
    }

    // Xóa lịch hẹn
    public function deleteBooking() {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            if ($this->bookingModel->deleteBooking($id)) {
                echo json_encode(["success" => true]);
                exit();
            } else {
                echo json_encode(["success" => false, "message" => "Lỗi khi xóa"]);
                exit();
            }
        }
    }
}
?>