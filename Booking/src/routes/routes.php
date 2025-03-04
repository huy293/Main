<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

include_once "../controller/ServiceController.php";
include_once "../controller/BookingController.php";
include_once "../controller/StaffController.php";

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    // 🔹 Quản lý dịch vụ
    case 'listServices':
        $serviceController = new ServiceController();
        $services = $serviceController->listServices();
        break;
    case 'addService':
        $serviceController = new ServiceController();
        $serviceController->addService();
        break;
    case 'updateService':
        $serviceController = new ServiceController();
        $serviceController->updateService();
        break;
    case 'deleteService':
        $serviceController = new ServiceController();
        $serviceController->deleteService();
        break;

    // 🔹 Quản lý lịch hẹn
    case 'listBookings':
        $bookingController = new BookingController();
        $bookings = $bookingController->listBookings();
        break;
    case 'updateStatus':
        $bookingController = new BookingController();
        $bookingController->updateStatus();
        break;
    case 'deleteBooking':
        $bookingController = new BookingController();
        $bookingController->deleteBooking();
        break;

    // 🔹 Quản lý nhân viên
    case 'listStaff':
        $staffController = new StaffController();
        $staffList = $staffController->listStaff();
        break;
    case 'addStaff':
        $staffController = new StaffController();
        $staffController->addStaff();
        break;
    case 'updateStaff':
        $staffController = new StaffController();
        $staffController->updateStaff();
        break;
    case 'deleteStaff':
        $staffController = new StaffController();
        $staffController->deleteStaff();
        break;

    default:
        break;
}
?>
