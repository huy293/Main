<?php
include_once "../routes/routes.php"; 
?>

<head>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid #FFD700;
            margin-top: 24px;
            margin-bottom: 24px;
        }

        th,
        td {
            color: #959dcc;
            text-align: center;
            padding: 8px;
            border: 1px solid #FFD700;
        }
        h1,h2,h3{
            color: #959dcc;
            margin-top: 24px;
            margin-bottom: 24px;
        }
        h1 {
            text-align: center;
        }

        input[type=text],
        input[type=number],
        select {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        input[type=submit] {
            width: 100%;
            background-color: #4CAF50;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        input[type=submit]:hover {
            background-color: #45a049;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            
        }

        #mySidebar .log_out {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    </style>
</head>
<body>
    <div id="main">
        <div class="" style="background: linear-gradient(to right,rgba(27,31,52,0.8),rgba(27,31,52,0.8))">
            <button id="openNav" class="w3-button w3-xlarge" style="background: #FFD700; border: 1px solid #FFD700" onclick="w3_open()">&#9776;</button>
            <div class="w3-container" onclick="w3_close()">
                <h1 style="color:white; text-align:center; ">Chào mừng bạn đến với trang quản lý nhân viên</h1>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                <h3>Danh sách nhân viên</h3>
                    <!-- Button Thêm Nhân Viên -->
                    <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addStaffModal">Thêm Nhân Viên</button>
                    
                    <!-- Bảng danh sách nhân viên -->
                    <table class="table table-bordered">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Tên tài khoản</th>
                                <th>Số điện thoại</th>
                                <th>Giới tính</th>
                                <th>Lương</th>
                                <th>Ngày sinh</th>
                                <th>Ca làm</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($staffList as $staff): ?>
                            <tr>
                                <td><?= $staff['id'] ?></td>
                                <td><?= $staff['username'] ?></td>
                                <td><?= $staff['phone_number'] ?></td>
                                <td><?= $staff['gender'] ?></td>
                                <td><?= $staff['salary'] ?></td>
                                <td><?= $staff['date_of_birth'] ?></td>
                                <td><?= $staff['shift'] ?></td>
                                <td><?= $staff['status'] ?></td>
                                <td>
                                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editStaffModal" 
                                    onclick="editStaff(<?= $staff['id'] ?>, '<?= $staff['phone_number'] ?>', '<?= $staff['gender'] ?>', <?= $staff['salary'] ?>, '<?= $staff['date_of_birth'] ?>', '<?= $staff['shift'] ?>')"><i class="fas fa-cog fa-lg"></i></button>
                                    <button type="button" class="btn btn-danger btn-delete delete-staff" data-id="<?= $staff['id'] ?>"><i class="fas fa-trash-alt" style="color: white;"></i></button>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

<!-- Modal Thêm Nhân Viên -->
<div class="modal fade" id="addStaffModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Thêm Nhân Viên</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <input type="text" id="account_id" class="form-control mb-2" placeholder="ID Tài khoản">
                <input type="text" id="phone" class="form-control mb-2" placeholder="Số điện thoại">
                <select id="gender" class="form-control mb-2">
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                </select>
                <input type="number" id="salary" class="form-control mb-2" placeholder="Lương">
                <input type="date" id="dob" class="form-control mb-2">
                <input type="text" id="shift" class="form-control mb-2" placeholder="Ca làm việc">
                <button class="btn btn-success" onclick="addStaff()">Thêm</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal Sửa Nhân Viên -->
<div class="modal fade" id="editStaffModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Chỉnh sửa nhân viên</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <form action="/view/admin.php?action=updateStaff" method="POST">
                    <input type="hidden" id="edit_id">
                    <input type="text" id="edit_phone" class="form-control mb-2" placeholder="Số điện thoại">
                    <select id="edit_gender" class="form-control mb-2">
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                    </select>
                    <input type="number" id="edit_salary" class="form-control mb-2" placeholder="Lương">
                    <input type="date" id="edit_dob" class="form-control mb-2">
                    <select id="edit_shift"  class="form-control mb-2">
                        <option value="9:00-13:00">9:00-13:00</option>
                        <option value="13:00-21:00">13:00-21:00</option>
                    </select>
                    <button type="submit" class="btn btn-warning">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>

</script>
</body>
</html>
