import { React, useState, useEffect } from "react";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import moviegenreColumns from "../../../components/Datatable/column/moviegenreColumns";
import genreColumns from "../../../components/Datatable/column/genreColumns";
import Select from "react-select";
import axios from "axios";

const Genre = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [name, setName] = useState(""); // State lưu tên thể loại
  const [loading, setLoading] = useState(true); // Trạng thái loading khi gửi dữ liệu
  const [genres, setGenre] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Selected movie ID
  // Hàm đóng form và hiển thị thông báo toast
  const handleCloseAddMovieForm = (sc) => {
    setShowAddMovieForm(false);
  };
  const handleChangegenre = (e) => {
    setName(e.target.value);
  };
  const handleChangeMovie = (selected) => {
    setSelectedMovie(selected ? selected.value : null);
  };
  const handleSubmitgenre = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang khi submit form

    if (!name) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8888/api/genre/",
        { name }, // Dữ liệu gửi lên API
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setReloadTrigger((prev) => !prev); // Đảo trạng thái để kích hoạt useEffect
      setLoading(true);
      console.log("Thêm thể loại thành công:", response.data);
      setName(""); // Xóa input sau khi thêm thành công
    } catch (err) {
      console.error("Error:", err);
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
      const response = await axios.put(
        `http://localhost:8888/api/movie-genre/${selectedMovie}`,
        { genreIds },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Cập nhật thể loại phim thành công:", response.data);
      // Reset form
      setSelectedMovie(null);
      setSelectedOptions([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch genres
        const genreResponse = await axios.get("http://localhost:8888/api/genre", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        // Fetch movies with genres
        const moviesResponse = await axios.get(
          "http://localhost:8888/api/movies/with-genres",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Format data for dropdowns
        const movieOptions = moviesResponse.data.map((movie) => ({
          value: movie.id,
          label: movie.title,
        }));

        const genreOptions = genreResponse.data.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }));

        setMovies(moviesResponse.data); // For the table
        setGenre(genreResponse.data); // For the genre management
        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra khi tải dữ liệu", error);
        setLoading(false);
      }
    };

    fetchData();
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
                columns={genreColumns}
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
                  Thêm thể loại
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
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleSubmitgenre}
                disabled={loading} // Vô hiệu hóa nút khi đang gửi dữ liệu
              >
                {loading ? "Đang thêm..." : "Thêm"}
              </button>
            </div>

            <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 2xl:mt-14 w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Thêm phim - thể loại
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
                  placeholder="Chọn phim..."
                  isSearchable={true}
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
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleSubmitMovieGenre}
                disabled={loading}
              >
                Thêm
              </button>
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
                columns={moviegenreColumns}
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
