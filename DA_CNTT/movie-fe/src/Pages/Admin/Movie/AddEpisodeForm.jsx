import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";

const AddEpisodeForm = ({ season, mode, initialData, onClose, onReload }) => {
  const [formData, setFormData] = useState({
    episode_number: "",
    title: "",
    overview: "",
    runtime: "",
    video_url: "",
    release_date: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        episode_number: initialData.episode_number,
        title: initialData.title,
        overview: initialData.overview,
        runtime: initialData.runtime,
        video_url: initialData.video_url,
        release_date: initialData.release_date ? initialData.release_date.split("T")[0] : "",
      });
    }
  }, [mode, initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.episode_number) {
      newErrors.episode_number = "Vui lòng nhập số tập";
    }
    if (!formData.title) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    }
    if (!formData.overview) {
      newErrors.overview = "Vui lòng nhập mô tả";
    }
    if (!formData.runtime) {
      newErrors.runtime = "Vui lòng nhập thời lượng";
    }
    if (!formData.video_url) {
      newErrors.video_url = "Vui lòng nhập URL video";
    }
    if (!formData.release_date) {
      newErrors.release_date = "Vui lòng chọn ngày phát hành";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) return;

    try {
      if (mode === "edit" && initialData?.id) {
        await axiosInstance.put(`/api/episode/${initialData.id}`, {
          ...formData,
          seasonId: season.value,
        });
        alert("Cập nhật tập phim thành công!");
      } else {
        await axiosInstance.post("/api/episode", {
          ...formData,
          seasonId: season.value,
        });
        alert("Thêm tập phim thành công!");
      }
      onReload();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.error || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {mode === "edit" ? "Sửa tập phim" : "Thêm tập phim mới"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Số tập
              </label>
              <input
                type="number"
                name="episode_number"
                value={formData.episode_number}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.episode_number
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.episode_number && (
                <p className="text-red-500 text-xs mt-1">{errors.episode_number}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thời lượng (phút)
              </label>
              <input
                type="number"
                name="runtime"
                value={formData.runtime}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                  errors.runtime
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
              {errors.runtime && (
                <p className="text-red-500 text-xs mt-1">{errors.runtime}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tiêu đề
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mô tả
            </label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              rows="4"
              className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.overview
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.overview && (
              <p className="text-red-500 text-xs mt-1">{errors.overview}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL Video
            </label>
            <input
              type="text"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.video_url
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.video_url && (
              <p className="text-red-500 text-xs mt-1">{errors.video_url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ngày phát hành
            </label>
            <input
              type="date"
              name="release_date"
              value={formData.release_date}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white ${
                errors.release_date
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {errors.release_date && (
              <p className="text-red-500 text-xs mt-1">{errors.release_date}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Đang xử lý..."
                : mode === "edit"
                ? "Cập nhật"
                : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEpisodeForm; 