<?php
session_start();
ob_start();
include "../model/connect.php";
include "../model/user.php";
if (isset($_POST['booking'])) {
    $username = $_SESSION['user'];
    $name_NV = $_POST['name_NV'];
    $name_service = $_POST['name_service'];
    $date_founded = $_POST['date_founded'];
    $time_book = $_POST['time_book'];
    $Note = $_POST['Note'];

    // Validate the input
    if (empty($date_founded) || empty($time_book) || empty($name_NV) || empty($name_service)) {
        echo "All fields are required.";
        header('location: booking_website.php');
    }
    addBooking($username, $name_NV, $name_service, $date_founded, $time_book, $Note);
    header('location: home.php');
}			
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="remixicons/fonts/remixicon.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Booking</title>
</head>
<body>
    <section id="booking">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 mx-auto">
                    <form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
                        <div class="col-12 mb-4">
                            <h1>Đặt lịch</h1>
                            <p>Qúy khách vui lòng nhập ngày giờ và ghi chú(nếu có).</p>
                        </div>
                        <div class="form-group col-12">
                            <input type="date" class="form-control" name="date_founded" id="date_founded" value="">
                        </div>
                        <div class="form-group col-12">
                            <input type="time" class="form-control" name="time_book" id="time_book" value="">
                        </div>
                        <div class="form-group col-12">
                            <select name="name_NV" id="name_NV" class="form-control">
                                <option value="">Nhân viên</option>
                                <option value="Lưu Khang Huy">Lưu Khang Huy</option>
                                <option value="Lê Hữu Lợi">Lê Hữu Lợi</option>
                                <option value="Nguyễn Vạn Phú">Nguyễn Vạn Phú</option>
                                <option value="Dương Thái Tín">Dương Thái Tín</option>
                            </select>
                        </div>
                        <div class="form-group col-12">
                            <select name="name_service" id="name_service" class="form-control">
                                <option value="">Dịch vụ</option>
                                <option value="Cắt tóc">Cắt tóc</option>
                                <option value="Uốn tóc">Uốn tóc</option>
                                <option value="Nhuộm tóc">Nhuộm tóc</option>
                            </select>
                        </div>
                        <div class="form-group col-12">
                            <textarea name="Note" class="form-control" id="Note" cols="30" rows="5" placeholder="Message"></textarea>
                        </div>
                        <div class="form-group col-12">
                            <input type="submit" class="btn btn-brand mt-3" name="booking" value="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
</html>