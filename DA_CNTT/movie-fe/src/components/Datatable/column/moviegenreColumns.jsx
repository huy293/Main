const moviegenreColumns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Tên thể loại",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Thao tác",
    render: (row) => (
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

export default moviegenreColumns;
