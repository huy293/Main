<?php

// Trong file user.php
include_once '../model/connect.php';

function checkuser($user, $pass) {
    $conn = connect();
    $stmt = $conn->prepare("SELECT role FROM account WHERE username = :username AND pad = :password");
    $stmt->bindParam(':username', $user);
    $stmt->bindParam(':password', $pass);
    $stmt->execute();
    $result = $stmt->fetch();
    if ($result !== false && count($result) > 0) {
        return $result['role'];
    } else {
        return 2;  // Trả về 'Customer' nếu không tìm thấy tài khoản
    }
}

function getuserinfo($user, $pass) {
    $conn = connect();
    $stmt = $conn->prepare("SELECT * FROM account WHERE username = :username AND pad = :password");
    $stmt->bindParam(':username', $user);
    $stmt->bindParam(':password', $pass);
    $stmt->execute();
    $result = $stmt->fetchAll();
    return $result;
}

function checkAccountExit($user) {
    $conn = connect();
    $stmt = $conn->prepare("SELECT username FROM account WHERE username = :username");
    $stmt->bindParam(':username', $user);
    $stmt->execute();
    $result = $stmt->fetch();
    return $result !== false;
}

function addAccount($user, $pass, $name, $phonenumber) {
    if (!checkAccountExit($user)) {
        $conn = connect();
        $stmt = $conn->prepare("INSERT INTO account (username, pad, name, phone) VALUES (:username, :password, :name, :phonenumber)");
        $stmt->bindParam(':username', $user);
        $stmt->bindParam(':password', $pass);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':phonenumber', $phonenumber);
        $stmt->execute();
        echo "<script>alert('Đăng ký thành công!');</script>";
    } else {
        echo "<script>alert('Tên tài khoản đã tồn tại!');</script>";
    }
}

function checkIDstaff($id_Staff) {
    $conn = connect();
    $stmt = $conn->prepare("SELECT id FROM staff WHERE id = :id");
    $stmt->bindParam(':id', $id_Staff);
    $stmt->execute();
    $result = $stmt->fetch();
    return $result !== false;
}

function addEmployee($account_id, $phone_number, $gender, $salary, $date_of_birth, $status, $shift){
    if(checkIDstaff($account_id)==false){
        $conn = connect();
        $stmt = $conn->prepare("INSERT INTO staff (account_id, phone_number, gender, salary, date_of_birth, status, shift) 
                                VALUES (:account_id, :phone_number, :gender, :salary, :date_of_birth, :status, :shift)"); 
        $stmt->bindParam(':account_id', $account_id);
        $stmt->bindParam(':phone_number', $phone_number);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':salary', $salary);
        $stmt->bindParam(':date_of_birth', $date_of_birth);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':shift', $shift);
        $stmt->execute();
        echo "<script>alert('Thêm thành công!');</script>";
    }
    else{
        echo "<script>alert('ID nhân viên đã tồn tại!');</script>";
    }
}

function deleteEmployee($id_staff) {
    $conn = connect();
    $stmt = $conn->prepare("DELETE FROM staff WHERE id = :id");
    $stmt->bindParam(':id', $id_staff);
    $stmt->execute();
    echo "<script>alert('Xóa nhân viên thành công!');</script>";
}

function addBooking($username, $staff_id, $service_id, $date_founded, $time_book, $note) {
    $conn = connect();
    $stmt = $conn->prepare("INSERT INTO booking (username, staff_id, name_service, date_founded, time_book, Note) VALUES (:username, :staff_id, :service_id, :date_founded, :time_book, :note)"); 
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':staff_id', $staff_id);
    $stmt->bindParam(':service_id', $service_id);
    $stmt->bindParam(':date_founded', $date_founded);
    $stmt->bindParam(':time_book', $time_book);
    $stmt->bindParam(':note', $note);
    $stmt->execute();
}

function updateBookingStatus($booking_id, $status) {
    $conn = connect();
    $stmt = $conn->prepare("UPDATE booking SET status = :status WHERE id = :booking_id");
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':booking_id', $booking_id);
    $stmt->execute();
}

function addPayment($booking_id, $payment_method, $amount, $status, $transaction_id) {
    $conn = connect();
    $stmt = $conn->prepare("INSERT INTO payment (booking_id, payment_method, amount, status, transaction_id) VALUES (:booking_id, :payment_method, :amount, :status, :transaction_id)");
    $stmt->bindParam(':booking_id', $booking_id);
    $stmt->bindParam(':payment_method', $payment_method);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':transaction_id', $transaction_id);
    $stmt->execute();
}

function addReview($username, $staff_id, $rating, $comment) {
    $conn = connect();
    $stmt = $conn->prepare("INSERT INTO review (username, staff_id, rating, comment) VALUES (:username, :staff_id, :rating, :comment)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':staff_id', $staff_id);
    $stmt->bindParam(':rating', $rating);
    $stmt->bindParam(':comment', $comment);
    $stmt->execute();
}

function addNotification($username, $message, $type) {
    $conn = connect();
    $stmt = $conn->prepare("INSERT INTO notification (username, message, type) VALUES (:username, :message, :type)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':type', $type);
    $stmt->execute();
}
?>
