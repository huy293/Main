import { React, useState, useEffect } from "react";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import Select from "react-select";
import axios from "axios";

const People = () => {
//   useEffect(() => {
//     // Gọi API để lấy dữ liệu thể loại
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8888/api/genre", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         });
//         const moviesResponse = await axios.get(
//           "http://localhost:8888/api/movies",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );
//         const titleMovie = moviesResponse.data.map((movie) => ({
//           id: movie.id,
//           title: movie.title,
//         }));
//         // Lọc chỉ lấy trường 'name' từ dữ liệu trả về
//         const genreNames = response.data.map((genre) => ({
//           id: genre.id,
//           name: genre.name,
//         }));
//         setMovies(titleMovie);
//         // Cập nhật state với dữ liệu chỉ chứa 'name'
//         setGenre(genreNames);
//         setLoading(false);
//       } catch (error) {
//         console.error("Có lỗi xảy ra khi tải dữ liệu", error);
//       }
//     };

//     fetchData();
//   }, [reloadTrigger]);
const columns = [];
const [movies, setMovies] = useState([]);
  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Đội ngũ phim
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Plus className="w-5 h-5" /> Thêm thành viên
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <Datatables columns={columns} data={movies} tableId="movie-table" />
        </div>
      </div>
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Đội ngũ sản xuất
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Plus className="w-5 h-5" /> Thêm nhân viên
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <Datatables columns={columns} data={movies} tableId="movie-table" />
        </div>
      </div>
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Đội ngũ diễn viên
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Plus className="w-5 h-5" /> Thêm diễn viên
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <Datatables columns={columns} data={movies} tableId="movie-table" />
        </div>
      </div>
    </div>
  );
};

export default People;
