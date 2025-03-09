<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/BookingModel.php';

class BookingController {
    private $bookingModel;

    public function __construct() {
        $this->bookingModel = new BookingModel();
    }

    // Lấy danh sách lịch hẹn
    public function getAllBookings() {
        if (!isset($_SESSION['is_logged_in'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $bookings = $this->bookingModel->getAllBookings();
        echo json_encode(['status' => true, 'data' => $bookings]);
        exit;
    }

    // Lấy lịch hẹn theo ID
    public function getBookingById($id) {
        if (!isset($_SESSION['is_logged_in'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $booking = $this->bookingModel->getBookingById($id);
        if ($booking) {
            echo json_encode(['status' => true, 'data' => $booking]);
        } else {
            echo json_encode(['status' => false, 'message' => 'Không tìm thấy lịch hẹn']);
        }
        exit;
    }

    // Đặt lịch hẹn mới
    public function createBooking() {
        if (!isset($_SESSION['is_logged_in'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->bookingModel->createBooking($data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Đặt lịch thành công' : 'Lỗi khi đặt lịch']);
        exit;
    }

    // Cập nhật lịch hẹn
    public function updateBooking($id) {
        if (!isset($_SESSION['is_logged_in'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $success = $this->bookingModel->updateBooking($id, $data);
        
        echo json_encode(['status' => $success, 'message' => $success ? 'Cập nhật lịch hẹn thành công' : 'Lỗi khi cập nhật lịch hẹn']);
        exit;
    }

    // Hủy lịch hẹn
    public function cancelBooking($id) {
        if (!isset($_SESSION['is_logged_in'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn chưa đăng nhập']);
            exit;
        }

        $success = $this->bookingModel->cancelBooking($id);
        echo json_encode(['status' => $success, 'message' => $success ? 'Lịch hẹn đã bị hủy' : 'Lỗi khi hủy lịch hẹn']);
        exit;
    }
}
?>
