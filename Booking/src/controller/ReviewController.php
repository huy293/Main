<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '/var/www/html/model/ReviewModel.php';

class ReviewController {
    private $reviewModel;

    public function __construct() {
        $this->reviewModel = new ReviewModel();
    }

    public function getAllReviews() {
        echo json_encode($this->reviewModel->getAllReviews());
        exit;
    }

    public function getReviewByStaff($staff_id) {
        echo json_encode($this->reviewModel->getReviewByStaff($staff_id));
        exit;
    }

    public function createReview() {
        if (!isset($_SESSION['user_id'])) {
            echo json_encode(['status' => false, 'message' => 'Bạn cần đăng nhập để đánh giá']);
            exit;
        }

        $data = json_decode(file_get_contents("php://input"), true);
        $newId = $this->reviewModel->createReview($data);
        echo json_encode(['status' => true, 'message' => 'Gửi đánh giá thành công', 'id' => $newId]);
        exit;
    }

    public function disableReview($id) {
        if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'Admin') {
            echo json_encode(['status' => false, 'message' => 'Bạn không có quyền xóa đánh giá']);
            exit;
        }

        $disabled = $this->reviewModel->disableReview($id);
        echo json_encode(['status' => true, 'message' => 'Đánh giá đã bị ẩn', 'rows_affected' => $disabled]);
        exit;
    }
}
?>
