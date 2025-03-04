<?php include_once "../routes/routes.php"; 
?>
<!DOCTYPE html>
<html>
<title>W3.CSS</title>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="remixicons/fonts/remixicon.css">

<style>
    #mySidebar .log_out {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    body {
        background-image:linear-gradient(to right,rgba(27,31,52,0.8),rgba(27,31,52,0.8)), url('image/bia.jpg');
        background-size: cover;
    }
</style>
<body>

    <div class="w3-sidebar w3-bar-block w3-card w3-animate-left" style="display:none" id="mySidebar">
        <div style="display:flex; justify-content: center;">
            <img src="image\admin.jpg" class="rounded-circle" alt="Cinque Terre" style="wight:400px;height:100px;">
        </div>
        <p style="display:flex; justify-content: center;">Hello Admin</p>
        <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
            <a href="home.php" class="w3-bar-item w3-button"><i class="fas fa-home fa-lg"></i>
            <h6>Home Page</h6>
        </a>
        <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
        <a href="#" class="w3-bar-item w3-button" onclick="loadPage('statistics.php')"><i class="fas fa-coins fa-lg" ></i>
            <h6>Báo cáo thống kê</h6>
        </a>
         <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
        <a href="#" class="w3-bar-item w3-button" onclick="loadPage('employee.php?action=listStaff')"><i class="fas fa-users fa-lg" style="" ></i>
            <h6>Quản lý nhân viên</h6>
        </a>
        <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
        <a href="#" class="w3-bar-item w3-button" onclick="loadPage('booking_admin.php?action=listBookings')"><i class="far fa-calendar-check fa-lg" ></i>
            <h6>Quản lý Booking</h6>
        </a>
        <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
        <a href="#" class="w3-bar-item w3-button" onclick="loadPage('service.php?action=listServices')"><i class="far fa-calendar-check fa-lg" ></i>
            <h6>Quản lý dịch vụ</h6>
        </a>
        <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
        <a href="#" class="w3-bar-item w3-button" onclick="loadPage('account.php')">
            <i class="fas fa-user-circle fa-lg"></i>
            <h6>Quản lý tài khoản</h6>
        </a>
        <hr style="height:1px;border-width:0;color:gray;background-color:gray;margin:0;">
        <div class="log_out">
            <i class="fas fa-sign-out-alt fa-lg" style="color: #1454c2; font-size: 4em;" onclick="log_out()"></i>
        </div>
    </div>

    <div id="main">

        <div class="w3-teal">
            <button id="openNav" class="w3-button w3-teal w3-xlarge" onclick="w3_open()">&#9776;</button>
            <div class="w3-container" onclick="w3_close()">
                <h1 style="text-align:center;">Chào mừng bạn đến trang quản lý</h1>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        function w3_open() {
            document.getElementById("main").style.marginLeft = "250px";
            document.getElementById("mySidebar").style.width = "250px";
            document.getElementById("mySidebar").style.display = "block";
            document.getElementById("openNav").style.display = 'none';
        }
        function w3_close() {
            document.getElementById("main").style.marginLeft = "0%";
            document.getElementById("mySidebar").style.display = "none";
            document.getElementById("openNav").style.display = "inline-block";
        }
        // load trang 
        function loadPage(pageUrl) {
            // Sử dụng XMLHttpRequest để load nội dung trang
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("main").innerHTML = this.responseText;
                    attachEventHandlers();
                }
            };
            xhttp.open("GET", pageUrl, true);
            xhttp.send();
            // Đóng thanh sidebar khi chuyển trang
            w3_close()
        }
        function log_out(){
            if(confirm("Bạn có muốn thoát ?")) {
                window.location.href = "login.php";
            }
        }
    function attachEventHandlers() {
        console.log("Đã gọi lại sự kiện!");

        // Cập nhật trạng thái lịch hẹn
        $(".update-status").off("change").on("change", function() {
            let id = $(this).data("id");
            let status = $(this).val();
            $.post("../view/admin.php?action=updateStatus", { id: id, status: status }, function(response) {
                console.log("Dữ liệu từ server:", response); // Kiểm tra dữ liệu trả về

                let result = JSON.parse(response);
                if (result.success) {
                    alert("Cập nhật thành công!");
                } else {
                    alert("Lỗi khi cập nhật!");
                }
            });
        });

        // Xóa lịch hẹn
        $(".delete-booking").off("click").on("click", function() {
            if (confirm("Bạn có chắc chắn muốn xóa lịch hẹn này?")) {
                let id = $(this).data("id");
                $.post("../view/admin.php?action=deleteBooking", { id: id }, function(response) {
                    let result = JSON.parse(response);
                    if (result.success) {
                        alert("Xóa thành công!");
                        loadPage('booking_admin.php?action=listBookings');
                    } else {
                        alert("Lỗi khi xóa!");
                    }
                });
            }
        });
        

        $(".delete-service").off("click").on("click", function() {
            if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
                let id = $(this).data("id");
                $.post("../view/admin.php?action=deleteService", { id: id }, function(response) {
                    let result = JSON.parse(response);
                    if (result.success) {
                        alert("Xóa thành công!");
                        loadPage('service.php?action=listServices');
                    } else {
                        alert("Lỗi khi xóa!");
                    }
                });
            }
        });
        $(".delete-staff").off("click").on("click", function() {
            if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
                let id = $(this).data("id");
                $.post("../view/admin.php?action=deleteStaff", { id: id }, function(response) {
                    let result = JSON.parse(response);
                    if (result.success) {
                        alert("Xóa thành công!");
                        loadPage('service.php?action=listServices');
                    } else {
                        alert("Lỗi khi xóa!");
                    }
                });
            }
        });
    }
    $(document).ready(function() {
        attachEventHandlers();
    });
    $(document).ready(function () {
        $(document).on("click", ".edit-service", function () {

            // Lấy dữ liệu từ data-attributes
            $("#editServiceId").val($(this).data("id"));
            $("#editServiceName").val($(this).data("name"));
            $("#editServicePrice").val($(this).data("price"));
            $("#editServiceDuration").val($(this).data("duration"));
            $("#editServiceDescription").val($(this).data("description"));
            $("#editServiceImage").val($(this).data("image"));

            // Hiển thị modal chỉnh sửa
            $("#editServiceModal").modal("show");
        });
    });
    function addStaff() {
    let account_id = document.getElementById("account_id").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementById("gender").value;
    let salary = document.getElementById("salary").value;
    let dob = document.getElementById("dob").value;
    let shift = document.getElementById("shift").value;
    
    fetch("../../routes.php?action=addStaff", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `account_id=${account_id}&phone=${phone}&gender=${gender}&salary=${salary}&dob=${dob}&shift=${shift}`
    }).then(res => res.json()).then(() => location.reload());
}

function editStaff(id, phone, gender, salary, dob, shift) {
    document.getElementById("edit_id").value = id;
    document.getElementById("edit_phone").value = phone;
    document.getElementById("edit_gender").value = gender;
    document.getElementById("edit_salary").value = salary;
    document.getElementById("edit_dob").value = dob;
    let shiftSelect = document.getElementById("edit_shift");
    shiftSelect.value = shift;
}

</script>
</body>

</html>