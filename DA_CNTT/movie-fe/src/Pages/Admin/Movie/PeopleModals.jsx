import React, { useState, useEffect } from "react";
import Select from "react-select";

export const PeopleModal = ({ isOpen, onClose, onSubmit, editingPerson }) => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    gender: "",
    biography: "",
    profile_url: ""
  });

  useEffect(() => {
    if (editingPerson) {
      setFormData({
        name: editingPerson.name || "",
        birthday: editingPerson.birthday ? new Date(editingPerson.birthday).toISOString().split('T')[0] : "",
        gender: editingPerson.gender || "",
        biography: editingPerson.biography || "",
        profile_url: editingPerson.profile_url || ""
      });
    } else {
      setFormData({
        name: "",
        birthday: "",
        gender: "",
        biography: "",
        profile_url: ""
      });
    }
  }, [editingPerson]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {editingPerson ? "Sửa thành viên" : "Thêm thành viên"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tên
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              value={formData.birthday}
              onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Giới tính
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tiểu sử
            </label>
            <textarea
              value={formData.biography}
              onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL ảnh đại diện
            </label>
            <input
              type="text"
              value={formData.profile_url}
              onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://example.com/image.jpg"
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
              {editingPerson ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CastModal = ({ isOpen, onClose, onSubmit, people, editingCast }) => {
  const [formData, setFormData] = useState({
    peopleId: "",
    role: "",
  });

  useEffect(() => {
    if (editingCast) {
      setFormData({
        peopleId: editingCast.Person.id,
        role: editingCast.role
      });
    } else {
      setFormData({
        peopleId: "",
        role: ""
      });
    }
  }, [editingCast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.peopleId) {
      alert("Vui lòng chọn diễn viên");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const peopleOptions = people.map(person => ({
    value: person.id,
    label: person.name
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {editingCast ? "Sửa vai diễn" : "Thêm diễn viên"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Diễn viên
            </label>
            <Select
              options={peopleOptions}
              value={peopleOptions.find(option => option.value === formData.peopleId)}
              onChange={(option) => setFormData({ ...formData, peopleId: option.value })}
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              required
              isDisabled={editingCast !== null}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vai diễn
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
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
              {editingCast ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CrewModal = ({ isOpen, onClose, onSubmit, people, editingCrew }) => {
  const [formData, setFormData] = useState({
    peopleId: "",
    job: "",
  });

  useEffect(() => {
    if (editingCrew) {
      setFormData({
        peopleId: editingCrew.Person.id,
        job: editingCrew.job
      });
    } else {
      setFormData({
        peopleId: "",
        job: ""
      });
    }
  }, [editingCrew]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.peopleId) {
      alert("Vui lòng chọn nhân viên");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const peopleOptions = people.map(person => ({
    value: person.id,
    label: person.name
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          {editingCrew ? "Sửa công việc" : "Thêm nhân viên đoàn phim"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nhân viên
            </label>
            <Select
              options={peopleOptions}
              value={peopleOptions.find(option => option.value === formData.peopleId)}
              onChange={(option) => setFormData({ ...formData, peopleId: option.value })}
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              required
              isDisabled={editingCrew !== null}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Công việc
            </label>
            <input
              type="text"
              value={formData.job}
              onChange={(e) => setFormData({ ...formData, job: e.target.value })}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
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
              {editingCrew ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 