import React, { useState, useEffect } from "react";
import Select from "react-select";

export const UserModal = ({ isOpen, onClose, onSubmit, editingUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    status: "active"
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        username: editingUser.username || "",
        email: editingUser.email || "",
        password: "", // Không hiển thị mật khẩu cũ
        role: editingUser.role || "user",
        status: editingUser.status || "active"
      });
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Nếu không nhập mật khẩu mới, không gửi trường password
    const dataToSubmit = !formData.password
      ? { ...formData, password: undefined }
      : formData;
    onSubmit(dataToSubmit);
  };

  if (!isOpen) return null;

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "moderator", label: "Moderator" },
    { value: "user", label: "User" }
  ];

  const statusOptions = [
    { value: "active", label: "Hoạt động" },
    { value: "locked", label: "Không hoạt động" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Sửa người dùng
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tên người dùng
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mật khẩu (để trống nếu không muốn thay đổi)
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vai trò
            </label>
            <Select
              options={roleOptions}
              value={roleOptions.find(option => option.value === formData.role)}
              onChange={(option) => setFormData({ ...formData, role: option.value })}
              className="basic-single"
              classNamePrefix="select"
              isClearable={false}
              isSearchable={false}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trạng thái
            </label>
            <Select
              options={statusOptions}
              value={statusOptions.find(option => option.value === formData.status)}
              onChange={(option) => setFormData({ ...formData, status: option.value })}
              className="basic-single"
              classNamePrefix="select"
              isClearable={false}
              isSearchable={false}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 