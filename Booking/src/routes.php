<?php
// Load tất cả các controller
require_once '/var/www/html/controller/AccountController.php';
require_once '/var/www/html/controller/AuthController.php';
require_once '/var/www/html/controller/StaffController.php';
require_once '/var/www/html/controller/CustomerController.php';
require_once '/var/www/html/controller/BookingController.php';
require_once '/var/www/html/controller/ScheduleController.php';
require_once '/var/www/html/controller/ServiceController.php';
require_once '/var/www/html/controller/ReviewController.php';
require_once '/var/www/html/controller/NotificationController.php';
require_once '/var/www/html/controller/AttendanceController.php';

// Tạo instance của từng controller
$controllers = [
    'account' => new AccountController(),
    'auth' => new AuthController(),
    'staff' => new StaffController(),
    'customer' => new CustomerController(),
    'booking' => new BookingController(),
    'schedule' => new ScheduleController(),
    'service' => new ServiceController(),
    'review' => new ReviewController(),
    'notification' => new NotificationController(),
    'attendance' => new AttendanceController(),
];

// Lấy route từ URL
$route = isset($_GET['route']) ? trim($_GET['route'], '/') : null;
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Kiểm tra nếu route có đúng định dạng `/{controller}/{method}`
if ($route) {
    $parts = explode('/', $route);
    if (count($parts) == 2) {
        list($controllerName, $method) = $parts;

        // Kiểm tra controller có tồn tại không
        if (isset($controllers[$controllerName])) {
            $controller = $controllers[$controllerName];

            // Kiểm tra method có tồn tại trong controller không
            if (method_exists($controller, $method)) {
                $controller->$method(); // Gọi method
                exit;
            }
        }
    }
}

// Nếu không tìm thấy route hợp lệ
echo json_encode(['status' => false, 'message' => 'Không tìm thấy route hợp lệ']);
?>
