import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import Datatables from "../../../components/Datatable/Datatables";
import { userColumns } from "../../../components/Datatable/column/userColumns";
import { UserModal } from "../../../components/Modal/UserModal";
import Select from "react-select";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách người dùng");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await axios.put(`/api/user/toggle-lock/${id}`);
      alert(response.data.message);
      fetchUsers();
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert(err.response?.data?.message || "Không thể thay đổi trạng thái người dùng");
    }
  };

  const handleChangeRole = (user) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const handleRoleSubmit = async (newRole) => {
    try {
      const response = await axios.post(`/api/user/changerole/${selectedUser.id}`, {
        role: newRole
      });
      alert(response.data.message);
      setIsRoleModalOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error changing role:", err);
      alert(err.response?.data?.message || "Không thể thay đổi quyền người dùng");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await axios.put(`/api/user/${editingUser.id}`, formData);
      }
      setIsModalOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error submitting user:", err);
      alert("Không thể cập nhật người dùng");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "moderator", label: "Moderator" },
    { value: "admin", label: "Admin" }
  ];

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý người dùng
          </h1>
        </div>

        <div className="overflow-x-auto">
          <Datatables
            columns={userColumns(handleEditUser, handleToggleStatus, handleChangeRole)}
            data={users}
            title="Danh sách người dùng"
          />
        </div>

        {isModalOpen && (
          <UserModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingUser(null);
            }}
            onSubmit={handleSubmit}
            editingUser={editingUser}
          />
        )}

        {isRoleModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Phân quyền người dùng
              </h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Người dùng: {selectedUser.username}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Email: {selectedUser.email}
                </p>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vai trò mới
                </label>
                <Select
                  options={roleOptions}
                  value={roleOptions.find(option => option.value === selectedUser.role)}
                  onChange={(option) => handleRoleSubmit(option.value)}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={false}
                  isSearchable={false}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setIsRoleModalOpen(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
