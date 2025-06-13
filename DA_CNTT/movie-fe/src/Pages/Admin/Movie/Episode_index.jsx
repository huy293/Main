import React, { useState, useEffect } from "react";
import axiosInstance from "../../../config/axios";
import Datatables from "../../../components/Datatable/Datatables";
import { Plus } from "lucide-react";
import Select from "react-select";
import AddEpisodeForm from "./AddEpisodeForm";
import episodeColumns from "../../../components/Datatable/column/episodeColumns";

const Episode = () => {
  const [movies, setMovies] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEpisode, setEditingEpisode] = useState(null);

  // Fetch Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get("/api/movies");
        const seriesMovies = response.data.filter(movie => movie.type === "series");
        setMovies(seriesMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Fetch Seasons when movie is selected
  const fetchSeasons = async (movieId) => {
    if (!movieId) {
      setSeasons([]);
      return;
    }
    try {
      const response = await axiosInstance.get(`/api/season/movie/${movieId}`);
      setSeasons(response.data);
    } catch (error) {
      console.error("Error fetching seasons:", error);
      setSeasons([]);
    }
  };

  // Fetch Episodes when season is selected
  const fetchEpisodes = async (seasonId) => {
    if (!seasonId) {
      setEpisodes([]);
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/episode/season/${seasonId}`);
      setEpisodes(response.data);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Movie Selection
  const handleMovieChange = (selectedOption) => {
    setSelectedMovie(selectedOption);
    setSelectedSeason(null);
    setEpisodes([]);
    if (selectedOption) {
      fetchSeasons(selectedOption.value);
    }
  };

  // Handle Season Selection
  const handleSeasonChange = (selectedOption) => {
    setSelectedSeason(selectedOption);
    if (selectedOption) {
      fetchEpisodes(selectedOption.value);
    } else {
      setEpisodes([]);
    }
  };

  // Handle Edit Episode
  const handleEditEpisode = (episode) => {
    setEditingEpisode(episode);
    setShowAddForm(true);
  };

  // Handle Delete Episode
  const handleDeleteEpisode = async (episodeId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tập phim này?")) {
      try {
        await axiosInstance.delete(`/api/episode/${episodeId}`);
        fetchEpisodes(selectedSeason.value);
      } catch (error) {
        console.error("Error deleting episode:", error);
      }
    }
  };

  // Add handlers to episodes data
  const episodesWithHandlers = episodes.map(episode => ({
    ...episode,
    onEdit: handleEditEpisode,
    onDelete: handleDeleteEpisode
  }));

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mr-5">
              Quản lý tập phim
            </h1>
            <Select
              value={selectedMovie}
              onChange={handleMovieChange}
              options={movies.map(movie => ({
                value: movie.id,
                label: movie.title
              }))}
              placeholder="Chọn phim..."
              isSearchable={true}
              className="mr-5 w-64"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#374151" : "#1f2937",
                  color: "white",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                input: (base) => ({
                  ...base,
                  color: "white",
                }),
              }}
            />
            <Select
              value={selectedSeason}
              onChange={handleSeasonChange}
              options={seasons.map(season => ({
                value: season.id,
                label: `Mùa ${season.season_number}: ${season.title}`
              }))}
              placeholder="Chọn mùa..."
              isSearchable={true}
              className="w-64"
              isDisabled={!selectedMovie}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#374151" : "#1f2937",
                  color: "white",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),
                input: (base) => ({
                  ...base,
                  color: "white",
                }),
              }}
            />
          </div>
          <button
            onClick={() => {
              setEditingEpisode(null);
              setShowAddForm(true);
            }}
            disabled={!selectedSeason}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg ${
              selectedSeason
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <Plus className="w-5 h-5" /> Thêm tập phim
          </button>
        </div>

        {showAddForm && selectedSeason && (
          <AddEpisodeForm
            season={selectedSeason}
            mode={editingEpisode ? "edit" : "add"}
            initialData={editingEpisode}
            onClose={() => {
              setShowAddForm(false);
              setEditingEpisode(null);
            }}
            onReload={() => fetchEpisodes(selectedSeason.value)}
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              Đang tải dữ liệu...
            </div>
          ) : !selectedMovie ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              Vui lòng chọn một phim
            </div>
          ) : !selectedSeason ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              Vui lòng chọn một mùa phim
            </div>
          ) : episodes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-300">
              Chưa có tập phim nào cho mùa này
            </div>
          ) : (
            <div>
              <div className="mb-4 text-gray-500 dark:text-gray-300">
                Số lượng tập: {episodes.length}
              </div>
              <Datatables
                key={episodes.map(e => e.id).join(",")}
                columns={episodeColumns}
                data={episodesWithHandlers}
                tableId="episode-table"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Episode;