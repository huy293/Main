import React, { useEffect } from "react";
import "simple-datatables/dist/style.css";

const Datatables = ({ columns, data }) => {
  useEffect(() => {
    import("simple-datatables").then((module) => {
      const DataTable = module.DataTable;

      if (document.getElementById("default-table")) {
        new DataTable("#default-table", {
          searchable: true,
          perPageSelect: false,
          sortable: true,
        });
      }
    });
  }, [data]); // Re-run effect if data changes

  return (
    <table id="default-table" className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse">
      <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="px-6 py-3">
              <span className="flex items-center">
                {col.name}
                <svg
                  className="w-4 h-4 ms-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m8 15 4 4 4-4m0-6-4-4-4 4"
                  />
                </svg>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {columns.map((col, j) => (
              <td key={j} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {col.selector ? col.selector(row) : row[col.selector]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatables;
