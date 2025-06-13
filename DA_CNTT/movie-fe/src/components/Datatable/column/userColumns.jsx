import React from "react";

export const userColumns = (handleEdit, handleToggleStatus, handleChangeRole) => [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "80px",
  },
  {
    name: "Tên người dùng",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Vai trò",
    selector: (row) => row.role,
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.role === "admin"
            ? "bg-purple-100 text-purple-800"
            : row.role === "moderator"
            ? "bg-blue-100 text-blue-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {row.role === "admin"
          ? "Admin"
          : row.role === "moderator"
          ? "Moderator"
          : "User"}
      </span>
    ),
  },
  {
    name: "Trạng thái",
    selector: (row) => row.status,
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          row.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.status === "active" ? "Hoạt động" : "Không hoạt động"}
      </span>
    ),
  },
  {
    name: "Thao tác",
    render: (row) => (
      <div className="flex gap-2">
        <button
          onClick={() => handleChangeRole(row)}
          className="px-3 py-1 text-sm text-yellow-600 hover:text-yellow-800"
        >
          Phân quyền
        </button>
        <button
          onClick={() => handleToggleStatus(row.id)}
          className={`px-3 py-1 text-sm ${
            row.status === "active"
              ? "text-red-600 hover:text-red-800"
              : "text-green-600 hover:text-green-800"
          }`}
        >
          {row.status === "active" ? "Khóa" : "Mở khóa"}
        </button>
      </div>
    ),
  },
]; 