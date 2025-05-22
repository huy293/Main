import React, { useState, useMemo } from "react";

const Datatables = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  };
  const filteredData = useMemo(() => {
    const keyword = removeVietnameseTones(searchTerm);
    return sortedData.filter((row) =>
      Object.values(row).some((val) => {
        if (typeof val === "string") {
          return removeVietnameseTones(val).includes(keyword);
        }
        return false;
      })
    );
  }, [searchTerm, sortedData]);
  

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, rowsPerPage, filteredData]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-700 dark:text-white">
          Hiển thị{" "}
          <select
            value={rowsPerPage}
            onChange={handlePerPageChange}
            className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{" "}
          dòng/trang
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            {columns.map((col, index) => (
              <th
                key={index}
                onClick={() => col.selector && handleSort(col.selector)}
                className="p-2 cursor-pointer text-left text-sm font-medium text-gray-700 dark:text-white"
              >
                {col.name}
                {sortConfig.key === col.selector &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500 dark:text-gray-300"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b dark:border-gray-600">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2 text-sm text-gray-800 dark:text-white"
                  >
                    {col.render
                      ? col.render(row)
                      : col.selector
                      ? col.selector(row)
                      : ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-700 dark:text-white">
        <span>
          Trang {currentPage}/{totalPages || 1}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
          >
            Trước
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default Datatables;
