import {React, useState} from "react";
import Datatables from "../../../components/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddMovieForm from "./addMovieForm";
const Movie = () => {
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const handleAddMovieClick = () => {
    setShowAddMovieForm(!showAddMovieForm);
  }
  const handleCloseAddMovieForm = () => {
    setShowAddMovieForm(false);
  }
  const movies = [
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi",
      status: "Published",
      image: "https://image.tmdb.org/t/p/w200/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    },
    {
      id: 2,
      title: "The Dark Knight",
      genre: "Action",
      status: "Draft",
      image: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
  ];

  const columns = [
    {
      name: "Ảnh",
      selector: (row) => <img src={row.image} alt={row.title} className="w-12 rounded" />,
      sortable: false,
      width: "100px",
    },
    {
      name: "Tên phim",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Thể loại",
      selector: (row) => row.genre,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Hành động",
      cell: (row) => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Pencil className="w-5 h-5" />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Quản lý phim</h1>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowAddMovieForm(!showAddMovieForm)}
          >
            <Plus className="w-5 h-5" /> Thêm phim
          </button>
          {showAddMovieForm && (
            <AddMovieForm onClose={handleCloseAddMovieForm} />
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <Datatables columns={columns} data={movies} />;
        </div>
      </div>
    </div>
  );
};

export default Movie;
