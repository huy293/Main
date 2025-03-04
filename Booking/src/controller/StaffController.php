<?php
include_once "../model/StaffModel.php";
include_once "../model/ScheduleModel.php";
include_once "../model/AttendanceModel.php";
class StaffController {
    private $staffModel;

    public function __construct() {
        $this->staffModel = new StaffModel();
    }

    public function listStaff() {
        return $this->staffModel->getAllStaff();
    }

    public function addStaff() {
        $account_id = $_POST['account_id'] ?? 0;
        $phone = $_POST['phone'] ?? '';
        $gender = $_POST['gender'] ?? 'Male';
        $salary = $_POST['salary'] ?? 0;
        $dob = $_POST['dob'] ?? null;
        $shift = $_POST['shift'] ?? 'Sáng';

        if ($this->staffModel->addStaff($account_id, $phone, $gender, $salary, $dob, $shift)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi thêm nhân viên"]);
        }
    }

    public function updateStaff() {
        $id = $_POST['id'] ?? 0;
        $phone = $_POST['phone'] ?? '';
        $gender = $_POST['gender'] ?? 'Male';
        $salary = $_POST['salary'] ?? 0;
        $dob = $_POST['dob'] ?? null;
        $shift = $_POST['shift'] ?? '9:00-13:00';

        if ($this->staffModel->updateStaff($id, $phone, $gender, $salary, $dob, $shift)) {
            echo "<script>
                    document.addEventListener('DOMContentLoaded', function() {
                        loadPage('employee.php?action=listStaff');
                    });
                </script>";
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi cập nhật nhân viên"]);
        }
    }

    public function deleteStaff() {
        $id = $_POST['id'] ?? 0;

        if ($this->staffModel->deleteStaff($id)) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi xóa nhân viên"]);
        }
    }
}
?>
