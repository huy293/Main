const movieCrewColumns = [
  {
    name: "ID",
    selector: row => row?.Person?.id || '',
    width: "80px"
  },
  {
    name: "Tên",
    selector: row => row?.Person?.name || '',
    width: "200px"
  },
  {
    name: "Công việc",
    selector: row => row?.job || '',
    width: "200px"
  },
  {
    name: "Thao tác",
    render: row => (
      <div className="flex gap-2">
        <button
          onClick={() => row.onEdit(row)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Sửa
        </button>
        <button
          onClick={() => row.onDelete(row)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
        >
          Xóa
        </button>
      </div>
    ),
    width: "250px"
  },
];

export default movieCrewColumns; 