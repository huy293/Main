const episodeColumns = [
  {
    name: "ID",
    selector: (row) => row.id,
    width: "80px",
  },
  {
    name: "Số tập",
    selector: (row) => row.episode_number,
    width: "100px",
  },
  {
    name: "Tiêu đề",
    selector: (row) => row.title,
    width: "200px",
  },
  {
    name: "Mô tả",
    selector: (row) => row.overview,
    width: "300px",
    wrap: true,
  },
  {
    name: "Thời lượng",
    selector: (row) => `${row.runtime} phút`,
    width: "120px",
  },
  {
    name: "Ngày phát hành",
    selector: (row) => row.release_date,
    width: "150px",
  },
  {
    name: "Thao tác",
    cell: (row) => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            const info = `
Thông tin tập phim:
- ID: ${row.id}
- Số tập: ${row.episode_number}
- Tiêu đề: ${row.title}
- Mô tả: ${row.overview}
- Thời lượng: ${row.runtime} phút
- Ngày phát hành: ${row.release_date}
- URL Video: ${row.video_url || 'Chưa cập nhật'}
`;
            alert(info);
          }}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Chi tiết
        </button>
        <button
          onClick={() => row.onEdit(row)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Sửa
        </button>
        <button
          onClick={() => row.onDelete(row.id)}
          className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
        >
          Xóa
        </button>
      </div>
    ),
    width: "250px",
  },
];

export default episodeColumns; 