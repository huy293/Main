import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddMovieForm = ({ onClose }) => {
  const [movie, setMovie] = useState({
    title: "",
    type: "movie", // default to "movie"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/movies/",
        movie,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Movie added successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-blue-400 transition duration-300"
        >
          &times;
        </button>

        <h1 className="text-4xl font-extrabold text-white text-center mb-6">
          Thêm phim mới
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
              <option value="movie">Phim</option>
              <option value="series">Series</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-lg"
            >
              Thêm phim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
