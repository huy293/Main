const seasonColumns = (onEdit, onDelete) => [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "MovieID",
    selector: (row) => row.movieId,
  },
  {
    name: "Season number",
    selector: (row) => row.season_number,
  },
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Overview",
    selector: (row) => row.overview,
  },
  {
    name: "Release date",
    selector: (row) => row.release_date,
  },
  {
    name: "Poster",
    selector: (row) => row.poster_url,
  },
  {
    name: "Backdrop",
    selector: (row) => row.backdrop_url,
  },
  {
    name: "Trailer",
    selector: (row) => row.trailer_url,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Rating",
    selector: (row) => row.rating,
  },
  {
    name: "Runtime",
    selector: (row) => row.runtime,
  },
  {
    name: "Thao tác",
    cell: (row) => (
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(row)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(row)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
        >
          Xóa
        </button>
      </div>
    ),
  },
];

export default seasonColumns;
