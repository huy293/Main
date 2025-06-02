import React, { useState } from "react";
import axiosInstance from "../../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const AddSeasonForm = ({ movieId, mode = "add", initialData = null, onClose, onReload }) => {
  const [season, setSeason] = useState({
    season_number: "",
    title: "",
    overview: "",
    release_date: "",
    poster_url: "",
    backdrop_url: "",
    trailer_url: "",
    type: "Season",
    status: "upcoming",
    runtime: "",
    ...(initialData || {}),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeason({ ...season, [name]: value });
    setError(""); // Clear error when user makes changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!season.season_number || !season.title || !season.overview) {
      setError("Vui lòng điền đầy đủ thông tin: Số mùa, Tiêu đề và Mô tả");
      setLoading(false);
      return;
    }

    try {
      if (mode === "edit" && initialData?.id) {
        // Cập nhật season
        await axiosInstance.put(`/api/season/${initialData.id}`, {
          ...season,
          movieId
        });
        alert("Cập nhật mùa phim thành công!");
      } else {
        // Thêm season mới
        await axiosInstance.post("/api/season", {
          ...season,
          movieId
        });
        alert("Thêm mùa phim thành công!");
      }
      onReload();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[999] flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto backdrop-blur-sm">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-[1300px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          {mode === "edit" ? "Chỉnh sửa mùa phim" : "Thêm mùa phim mới"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-white mb-2">Số mùa</label>
            <input
              type="number"
              name="season_number"
              value={season.season_number}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Tiêu đề</label>
            <input
              type="text"
              name="title"
              value={season.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-white mb-2">Mô tả</label>
            <textarea
              name="overview"
              value={season.overview}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Ngày phát hành</label>
            <input
              type="date"
              name="release_date"
              value={season.release_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Thời lượng (phút)</label>
            <input
              type="number"
              name="runtime"
              value={season.runtime}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">URL Poster</label>
            <input
              type="text"
              name="poster_url"
              value={season.poster_url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">URL Backdrop</label>
            <input
              type="text"
              name="backdrop_url"
              value={season.backdrop_url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">URL Trailer</label>
            <input
              type="text"
              name="trailer_url"
              value={season.trailer_url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Trạng thái</label>
            <select
              name="status"
              value={season.status}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="upcoming">Sắp ra mắt</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>

          <div className="col-span-2 text-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading 
                  ? "bg-gray-500 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white px-8 py-3 rounded-lg font-semibold`}
            >
              {loading 
                ? "Đang xử lý..." 
                : mode === "edit" 
                  ? "Cập nhật" 
                  : "Thêm mới"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSeasonForm;
