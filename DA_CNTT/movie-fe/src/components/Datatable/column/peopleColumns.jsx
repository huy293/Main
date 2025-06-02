import { Info } from "lucide-react";

const peopleColumns = [
  {
    name: "ID",
    selector: row => row.id,
    width: "80px"
  },
  {
    name: "Tên",
    selector: row => row.name,
    width: "200px"
  },
  {
    name: "Ngày sinh",
    selector: row => row.birthday ? new Date(row.birthday).toLocaleDateString('vi-VN') : '',
    width: "150px"
  },
  {
    name: "Giới tính",
    selector: row => row.gender,
    width: "120px"
  },
  {
    name: "Thao tác",
    render: row => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            const info = `
Thông tin chi tiết thành viên:
- ID: ${row.id}
- Tên: ${row.name}
- Ngày sinh: ${row.birthday ? new Date(row.birthday).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
- Giới tính: ${row.gender || 'Chưa cập nhật'}
- Tiểu sử: ${row.biography || 'Chưa cập nhật'}
- Ảnh đại diện: ${row.profile_url || 'Chưa cập nhật'}
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
    width: "250px"
  },
];

export default peopleColumns; 