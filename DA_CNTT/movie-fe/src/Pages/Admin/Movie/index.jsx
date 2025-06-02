import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddMovieForm from "./addMovieForm";
import AddSeasonForm from "./addSeasonForm";
import "react-toastify/dist/ReactToastify.css";
import movieColumns from "../../../components/Datatable/column/movieColumns";
import seasonColumns from "../../../components/Datatable/column/seasonColumns";
import TableSkeleton from "../../../components/Skeleton/TableSkeleton";

const Movie = () => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [showAddSeasonForm, setShowAddSeasonForm] = useState(false);
  const [movies, setMovies] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editingSeason, setEditingSeason] = useState(null);

  // Fetch Movies
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Lỗi khi tải phim:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Seasons by Movie
  const fetchSeasonsByMovie = async (movieId) => {
    console.log("Fetching seasons for movie ID:", movieId);
    if (!movieId) {
      setSeasons([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/season/movie/${movieId}`);
      console.log("Seasons data received:", res.data);
      setSeasons(res.data);
    } catch (error) {
      console.error("Lỗi khi tải mùa:", error);
      setSeasons([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMovies();
  }, [reloadTrigger]);

  // Effect to monitor seasons state
  useEffect(() => {
    console.log("Current seasons state:", seasons);
  }, [seasons]);

  // Event Handlers
  const handleMovieSelect = async (e) => {
    const movieId = e.target.value;
    console.log("Selected movie ID:", movieId);
    
    if (!movieId) {
      setSelectedMovie(null);
      setSeasons([]);
      return;
    }
    
    const movie = movies.find((m) => m.id.toString() === movieId);
    console.log("Found movie:", movie);
    setSelectedMovie(movie || null);
    await fetchSeasonsByMovie(movieId);
  };

  const handleCloseAddMovieForm = () => setShowAddMovieForm(false);
  const handleCloseAddSeasonForm = () => {
    setShowAddSeasonForm(false);
    setEditingSeason(null);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowAddMovieForm(true);
  };

  const handleDeleteMovie = async (movie) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa phim "${movie.title}" không?`);
    if (confirmed) {
      try {
        await axiosInstance.delete(`/api/movies/${movie.id}`);
        setReloadTrigger(prev => !prev); // Trigger reload of movies list
      } catch (error) {
        console.error("Lỗi khi xóa phim:", error);
        alert("Có lỗi xảy ra khi xóa phim. Vui lòng thử lại sau.");
      }
    }
  };

  const handleEditSeason = (season) => {
    setEditingSeason(season);
    setShowAddSeasonForm(true);
  };

  const handleDeleteSeason = async (season) => {
    const confirmed = window.confirm(`Bạn có chắc muốn xóa mùa "${season.title}" không?`);
    if (confirmed) {
      try {
        await axiosInstance.delete(`/api/season/${season.id}`);
        // Reload seasons list after successful deletion
        await fetchSeasonsByMovie(selectedMovie.id);
        // Show success message
        alert("Xóa mùa phim thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa mùa phim:", error);
        alert("Có lỗi xảy ra khi xóa mùa phim. Vui lòng thử lại sau.");
      }
    }
  };

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      {/* Quản lý phim */}
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý phim
          </h1>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowAddMovieForm(true)}
          >
            <Plus className="w-5 h-5" /> Thêm phim
          </button>
        </div>

        {showAddMovieForm && (
          <AddMovieForm
            mode={editingMovie ? "edit" : "add"}
            initialData={editingMovie}
            onClose={() => {
              setShowAddMovieForm(false);
              setEditingMovie(null);
            }}
            onReload={() => setReloadTrigger((prev) => !prev)}
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          {loading ? (
            <TableSkeleton rows={5} columns={6} />
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
            Quản lý mùa {selectedMovie ? `của phim "${selectedMovie.title}"` : ""}
          </h1>
          <div className="flex items-center">
            <select
              onChange={handleMovieSelect}
              value={selectedMovie?.id || ""}
              className="block w-48 px-4 py-2 mr-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
              disabled={loading}
            >
              <option value="">Chọn phim</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowAddSeasonForm(true)}
              disabled={!selectedMovie || loading}
            >
              <Plus className="w-5 h-5" /> Thêm mùa
            </button>
          </div>
        </div>

        {showAddSeasonForm && (
          <AddSeasonForm
            movieId={selectedMovie?.id}
            mode={editingSeason ? "edit" : "add"}
            initialData={editingSeason}
            onClose={handleCloseAddSeasonForm}
            onReload={() => fetchSeasonsByMovie(selectedMovie?.id)}
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          {loading ? (
            <TableSkeleton rows={3} columns={5} />
          ) : selectedMovie ? (
            seasons.length > 0 ? (
              <Datatables
                key={seasons.map((s) => s.id).join(",")}
                columns={seasonColumns(handleEditSeason, handleDeleteSeason)}
                data={seasons}
                tableId="season-table"
              />
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-300">
                Chưa có mùa nào cho phim này
              </div>
            )
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              Vui lòng chọn một phim để xem danh sách mùa
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
