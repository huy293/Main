import { React, useState, useEffect } from "react";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import moviegenreColumns from "../../../components/Datatable/column/moviegenreColumns";
import genreColumns from "../../../components/Datatable/column/genreColumns";
import Select from "react-select";
import axios from "axios";
import axiosInstance from "../../../config/axios";

const Genre = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState(""); // State lưu tên thể loại
  const [loading, setLoading] = useState(false); // Khởi tạo là false
  const [genres, setGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Selected movie ID
  const [editingGenre, setEditingGenre] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Thêm state để phân biệt giữa thêm mới và sửa

  // Hàm xử lý sửa thể loại
  const handleEditGenre = (genre) => {
    setEditingGenre(genre);
    setName(genre.name);
    setShowModal(true);
  };

  // Hàm xử lý xóa thể loại
  const handleDeleteGenre = async (genre) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thể loại "${genre.name}"?`)) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/api/genre/${genre.id}`);
        alert("Xóa thể loại thành công!");
        setReloadTrigger(prev => !prev); // Reload data
      } catch (error) {
        console.error("Error deleting genre:", error);
        alert("Có lỗi xảy ra khi xóa thể loại!");
      } finally {
        setLoading(false);
      }
    }
  };

  // Hàm xử lý sửa thể loại phim
  const handleEditMovieGenre = (movie) => {
    setIsEditing(true); // Đánh dấu đang ở chế độ sửa
    setSelectedMovie(movie.id);
    // Set các thể loại hiện tại của phim vào selectedOptions
    const currentGenres = movie.Genres.map(genre => ({
      label: genre.name,
      value: genre.id
    }));
    setSelectedOptions(currentGenres);
  };

  // Hàm xử lý xóa thể loại phim
  const handleDeleteMovieGenre = async (movie) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tất cả thể loại của phim "${movie.title}"?`)) {
      try {
        setLoading(true);
        await axiosInstance.put(`/api/movie-genre/${movie.id}`, { genreIds: [] });
        alert("Xóa thể loại phim thành công!");
        setReloadTrigger(prev => !prev); // Reload data
      } catch (error) {
        console.error("Error deleting movie genres:", error);
        alert("Có lỗi xảy ra khi xóa thể loại phim!");
      } finally {
        setLoading(false);
      }
    }
  };

  // Hàm đóng form và hiển thị thông báo toast
  const handleCloseAddMovieForm = (sc) => {
    setShowAddMovieForm(false);
  };

  const handleChangegenre = (e) => {
    setName(e.target.value);
  };

  const handleChangeMovie = (selected) => {
    setSelectedMovie(selected ? selected.value : null);
    if (!selected) {
      setIsEditing(false); // Reset trạng thái sửa khi không chọn phim
      setSelectedOptions([]); // Reset thể loại đã chọn
    }
  };

  const handleSubmitgenre = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit form

    if (!name) {
      return;
    }
    try {
      setLoading(true);
      if (editingGenre) {
        // Sử dụng API sửa khi đang ở chế độ sửa
        await axiosInstance.put(`/api/genre/${editingGenre.id}`, { name });
        alert("Cập nhật thể loại thành công!");
      } else {
        // Sử dụng API thêm khi thêm mới
        await axiosInstance.post("/api/genre", { name });
        alert("Thêm thể loại thành công!");
      }
      setReloadTrigger((prev) => !prev); // Đảo trạng thái để kích hoạt useEffect
      setName(""); // Xóa input sau khi thêm/sửa thành công
      setEditingGenre(null); // Reset trạng thái sửa
    } catch (err) {
      console.error("Error:", err);
      alert("Có lỗi xảy ra khi lưu thể loại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMovieGenre = async (e) => {
    e.preventDefault();
    if (!selectedMovie || selectedOptions.length === 0) {
      return; // Handle error if movie or genres are not selected
    }

    const genreIds = selectedOptions.map((option) => option.value);

    try {
      setLoading(true);
      const response = await axiosInstance.put(`/api/movie-genre/${selectedMovie}`, { genreIds });
      console.log("Cập nhật thể loại phim thành công:", response.data);
      // Reset form
      setSelectedMovie(null);
      setSelectedOptions([]);
      setIsEditing(false); // Reset trạng thái sửa
      // Trigger reload data
      setReloadTrigger(prev => !prev);
      alert("Cập nhật thể loại phim thành công!");
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi cập nhật thể loại phim!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editingGenre) {
        await axiosInstance.put(`/api/genre/${editingGenre.id}`, formData);
        alert("Cập nhật thể loại thành công!");
      } else {
        await axiosInstance.post("/api/genre", formData);
        alert("Thêm thể loại thành công!");
      }
      fetchGenres();
      setShowModal(false);
      setEditingGenre(null);
      setName(""); // Reset form
    } catch (error) {
      console.error("Error saving genre:", error);
      alert("Có lỗi xảy ra khi lưu thể loại");
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const genreResponse = await axiosInstance.get("/api/genre");
      setGenre(genreResponse.data);

      const moviesResponse = await axiosInstance.get("/api/movies");
      setMovies(moviesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [reloadTrigger]);

  return (
    <div className="min-h-screen flex items-start justify-start bg-gray-900 p-6 sm:ml-64">
      <div className="flex flex-wrap 2xl:flex-nowrap gap-6 max-w-screen-xl">
        <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14 w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Quản lý thể loại
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            {loading ? (
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            ) : (
              <Datatables
                columns={genreColumns(handleEditGenre, handleDeleteGenre)}
                data={genres}
                tableId="table-1"
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex flex-wrap 2xl:flex-nowrap gap-6 max-w-screen-xl">
            <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 2xl:mt-14 w-[400px] h-52">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {editingGenre ? "Sửa thể loại" : "Thêm thể loại"}
                </h1>
              </div>

              <div class="relative">
                <input
                  type="text"
                  id="floating_outlined"
                  class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={name}
                  onChange={handleChangegenre}
                />
                <label
                  for="floating_outlined"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                >
                  Tên thể loại
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                {editingGenre && (
                  <button
                    onClick={() => {
                      setEditingGenre(null);
                      setName("");
                    }}
                    className="w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Hủy
                  </button>
                )}
                <button
                  type="submit"
                  className={`${editingGenre ? 'w-full' : 'w-full'} bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors`}
                  onClick={handleSubmitgenre}
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : editingGenre ? "Lưu" : "Thêm"}
                </button>
              </div>
            </div>

            <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 2xl:mt-14 w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {isEditing ? "Sửa phim - thể loại" : "Thêm phim - thể loại"}
                </h1>
              </div>

              <div class="relative">
                <Select
                  options={
                    movies?.map((movie) => ({
                      label: movie.title,
                      value: movie.id,
                    })) || []
                  } // Default to empty array if movies is undefined or null
                  onChange={handleChangeMovie}
                  value={selectedMovie ? movies.find(m => m.id === selectedMovie) ? {
                    label: movies.find(m => m.id === selectedMovie).title,
                    value: selectedMovie
                  } : null : null}
                  placeholder="Chọn phim..."
                  isSearchable={true}
                  isDisabled={isEditing} // Disable select khi đang ở chế độ sửa
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "transparent",
                      borderColor: state.isFocused ? "#3b82f6" : "#9ca3af", // blue-500 / gray-400
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#3b82f6",
                      },
                      color: "#fff",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    input: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9ca3af", // text-gray-400
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#1f2937", // gray-800
                      color: "#fff",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused
                        ? "#2563eb"
                        : "transparent", // blue-600
                      color: state.isFocused ? "#fff" : "#fff",
                      "&:hover": {
                        backgroundColor: "#2563eb",
                        color: "#fff",
                      },
                    }),
                  }}
                />
              </div>

              <Select
                isMulti // Cho phép chọn nhiều
                name="options"
                options={genres.map((genre) => ({
                  label: genre.name,
                  value: genre.id,
                }))}
                value={selectedOptions}
                onChange={setSelectedOptions}
                className="basic-multi-select mt-5"
                classNamePrefix="select"
                placeholder="Chọn thể loại..."
                getOptionLabel={(e) => e.label} // Đảm bảo label hiển thị đúng
                getOptionValue={(e) => e.value} // Đảm bảo value là ID
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "transparent",
                    borderColor: state.isFocused ? "#3b82f6" : "#9ca3af", // blue-500 / gray-400
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#3b82f6",
                    },
                    color: "#fff",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#9ca3af", // text-gray-400
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937", // gray-800
                    color: "#fff",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#2563eb"
                      : "transparent", // blue-600
                    color: state.isFocused ? "#fff" : "#fff",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                      color: "#fff",
                    },
                  }),
                }}
              />

              <div className="flex gap-2 mt-4">
                {isEditing && (
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedMovie(null);
                      setSelectedOptions([]);
                    }}
                    className="w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Hủy
                  </button>
                )}
                <button
                  type="submit"
                  className={`${isEditing ? 'w-full' : 'w-full'} bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors`}
                  onClick={handleSubmitMovieGenre}
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : isEditing ? "Lưu" : "Thêm"}
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14 w-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Quản lý phim - thể loại
              </h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <Datatables
                columns={moviegenreColumns(handleEditMovieGenre, handleDeleteMovieGenre)}
                data={movies}
                tableId="table-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
