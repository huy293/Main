import React, { useState, useEffect, useMemo } from "react";
import Datatables from "../../../components/Datatable/Datatables";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = [
      {
        id: 1,
        name: "Nguyen Van A",
        email: "a@example.com",
        role: "user",
        status: "active",
      },
      {
        id: 2,
        name: "Tran Thi B",
        email: "b@example.com",
        role: "admin",
        status: "locked",
      },
      {
        id: 3,
        name: "Le Van C",
        email: "c@example.com",
        role: "user",
        status: "active",
      },
    ];
    setTimeout(() => {
      setUsers(data);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleLockUser = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "locked" : "active" }
          : u
      )
    );
    alert("Đã cập nhật trạng thái khóa/mở khóa user");
  };

  const resetPassword = (userId) => {
    alert(`Reset mật khẩu cho user ID: ${userId}`);
  };

  const changeRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    alert(`Đã thay đổi phân quyền cho user ID: ${userId} thành ${newRole}`);
  };

  // Columns với cấu trúc phù hợp react-data-table-component (selector + cell)
  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
        maxWidth: "70px",
      },
      {
        name: "Tên người dùng",
        selector: (row) => row.name,
        sortable: true,
        wrap: true,
        minWidth: "180px",
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        wrap: true,
        minWidth: "220px",
      },
      {
        name: "Phân quyền",
        cell: (row) => (
          <select
            value={row.role}
            onChange={(e) => changeRole(row.id, e.target.value)}
            className="border rounded px-1 py-0.5 text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        minWidth: "140px",
      },
      {
        name: "Trạng thái",
        cell: (row) => (
          <span
            className={`px-2 py-1 rounded text-white whitespace-nowrap ${
              row.status === "active" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {row.status === "active" ? "Hoạt động" : "Khóa"}
          </span>
        ),
        sortable: true,
        maxWidth: "120px",
      },
      {
        name: "Thao tác",
        cell: (row) => (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => toggleLockUser(row.id)}
              className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 text-sm"
            >
              {row.status === "active" ? "Khóa" : "Mở khóa"}
            </button>
            <button
              onClick={() => resetPassword(row.id)}
              className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600 text-sm"
            >
              Reset mật khẩu
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        minWidth: "220px",
      },
    ],
    [users]
  );

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-white mb-6">
        Quản lý Người dùng
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-48 text-white">
          Loading...
        </div>
      ) : (
        <Datatables data={users} columns={columns} />
      )}
    </div>
  );
};

export default User;
