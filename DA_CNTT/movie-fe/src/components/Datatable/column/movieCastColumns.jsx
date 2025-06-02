import { Pencil, Trash2, Info } from "lucide-react";

const movieCastColumns = [
  {
    name: "ID",
    selector: row => row.People.id,
    width: "80px"
  },
  {
    name: "Tên",
    selector: row => row.People.name,
    width: "200px"
  },
  {
    name: "Vai diễn",
    selector: row => row.role,
    width: "200px"
  },
  {
    name: "Thao tác",
    render: row => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            const info = `
Thông tin diễn viên:
- ID: ${row.People.id}
- Tên: ${row.People.name}
- Ngày sinh: ${row.People.birthday ? new Date(row.People.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
- Giới tính: ${row.People.gender || 'Chưa cập nhật'}
- Tiểu sử: ${row.People.biography || 'Chưa cập nhật'}
- Ảnh đại diện: ${row.People.profile_url || 'Chưa cập nhật'}

Thông tin vai diễn:
- Vai diễn: ${row.role}
- Mùa phim: ${row.Season?.title || 'Không xác định'} (Season ${row.Season?.season_number || '?'})
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

export default movieCastColumns; 