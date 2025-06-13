const moviegenreColumns = (onEdit, onDelete) => [
  {
    name: "Tên phim",
    selector: (row) => row.title,
    sortable: true,
    width: "300px",
  },
  {
    name: "Thể loại",
    selector: (row) => row.Genres.map(genre => genre.name).join(", "),
    sortable: true,
    wrap: true,
    width: "300px",
  },
  {
    name: "Thao tác",
    render: (row) => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            const info = `
Thông tin phim và thể loại:
- ID phim: ${row.id}
- Tên phim: ${row.title}
- Loại: ${row.type === 'movie' ? 'Phim lẻ' : 'Phim bộ'}
- Thể loại: ${row.Genres.map(genre => genre.name).join(', ')}
- Số thể loại: ${row.Genres.length}
`;
            alert(info);
          }}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Chi tiết
        </button>
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
    width: "250px",
  },
];

export default moviegenreColumns;
