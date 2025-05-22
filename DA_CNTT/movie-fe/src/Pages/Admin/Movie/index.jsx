import React, { useState, useEffect } from "react";
import axios from "axios";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddMovieForm from "./addMovieForm";
import AddSeasonForm from "./addSeasonForm";
import "react-toastify/dist/ReactToastify.css";
import movieColumns from "../../../components/Datatable/column/movieColumns";
import seasonColumns from "../../../components/Datatable/column/seasonColumns";

const Movie = () => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [showAddSeasonForm, setShowAddSeasonForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseAddMovieForm = () => {
    setShowAddMovieForm(false);
  };

  const handleCloseAddSeasonForm = () => {
    setShowAddSeasonForm(false);
  };

  const handleEditMovie = (movie) => {
    console.log("Edit", movie);
  };

  const handleDeleteMovie = (movie) => {
    console.log("Delete", movie);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch movies
        const moviesResponse = await axios.get(
          "http://localhost:8888/api/movies",
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("Movies:", moviesResponse.data);
        setMovies(moviesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Có lỗi xảy ra khi tải dữ liệu", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadTrigger]);

  return (
    <>
      <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
        {/* Quản lý phim */}
        <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Quản lý phim
            </h1>
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowAddMovieForm(!showAddMovieForm)}
            >
              <Plus className="w-5 h-5" /> Thêm phim
            </button>
          </div>

          {showAddMovieForm && (
            <div>
              <AddMovieForm
                onClose={handleCloseAddMovieForm}
                onReload={() => setReloadTrigger((prev) => !prev)}
              />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-300">
                Đang tải dữ liệu...
              </div>
            ) : (
              <Datatables
                key={movies.map((c) => c.id).join(",")}
                columns={movieColumns(handleEditMovie, handleDeleteMovie)}
                data={movies}
                tableId="movie-table"
              />
            )}
          </div>
        </div>

        {/* Quản lý mùa */}
        <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Quản lý mùa
            </h1>
            <div className="flex items-center justify-center">
              <select className="block w-full px-4 py-2 mt-1 mr-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400">
                <option value="">Chọn thể loại</option>
                <option value="action">Hành động</option>
                <option value="drama">Tâm lý</option>
                <option value="comedy">Hài</option>
              </select>

              <button
                className="flex items-center whitespace-nowrap gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 transition-colors duration-200"
                onClick={() => setShowAddSeasonForm(!showAddSeasonForm)}
              >
                <Plus className="w-4 h-4" />
                Thêm mùa
              </button>
            </div>
          </div>

          {showAddSeasonForm && (
            <div>
              <AddSeasonForm
                onClose={handleCloseAddSeasonForm}
                onReload={() => setReloadTrigger((prev) => !prev)}
              />
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-300">
                Đang tải dữ liệu...
              </div>
            ) : (
              <Datatables
                columns={seasonColumns(handleEditMovie, handleDeleteMovie)}
                data={seasons}
                tableId="season-table"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
