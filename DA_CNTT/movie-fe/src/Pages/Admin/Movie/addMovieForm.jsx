import React, { useState } from "react";
import axiosInstance from "../../../config/axios";
import "react-toastify/dist/ReactToastify.css";
import FormSkeleton from "../../../components/Skeleton/FormSkeleton";

const AddMovieForm = ({
  mode = "add",
  initialData = null,
  onClose,
  onReload,
}) => {
  const [movie, setMovie] = useState({
    title: "",
    type: "movie",
    ...(initialData || {}), // nếu có dữ liệu ban đầu thì fill vào
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "edit") {
        await axiosInstance.put(`/api/movies/${initialData.id}`, movie);
        console.log("Cập nhật phim thành công");
      } else {
        await axiosInstance.post("/api/movies", movie);
        console.log("Thêm phim thành công");
      }

      onReload();
      onClose();
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-blue-400 transition duration-300"
          disabled={loading}
        >
          &times;
        </button>

        {loading ? (
          <FormSkeleton fields={2} />
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-white text-center mb-6">
              {mode === "edit" ? "Chỉnh sửa phim" : "Thêm phim mới"}
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-white font-semibold mb-2"
                >
                  Tiêu đề phim
                </label>
                <input
                  type="text"
                  name="title"
                  value={movie.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề phim"
                  className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-white font-semibold mb-2"
                >
                  Thể loại
                </label>
                <select
                  name="type"
                  value={movie.type}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-lg"
                  required
                >
                  <option value="movie">Phim lẻ</option>
                  <option value="series">Phim bộ</option>
                </select>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className={`w-full p-4 ${
                    mode === "edit"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-lg`}
                  disabled={loading}
                >
                  {mode === "edit" ? "Lưu thay đổi" : "Thêm phim"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddMovieForm;
