import React, { useState, useEffect } from "react";
import axios from "axios";
import Datatables from "../../../components/Datatable/Datatables";
import { Pencil, Trash2, Plus } from "lucide-react";
import Select from "react-select";
const Episode = () => {
    const movieOptions = [
        { value: "inception", label: "Inception" },
        { value: "interstellar", label: "Interstellar" },
        { value: "avatar", label: "Avatar" },
        { value: "the-dark-knight", label: "The Dark Knight" },
      ];
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const moviesResponse = await axios.get(
//           "http://localhost:8888/api/movies",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );
//         setMovies(moviesResponse.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Có lỗi xảy ra khi tải dữ liệu", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [reloadTrigger]);

  return (
    <>
      <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
        <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mr-5">
                Quản lý tập phim
              </h1>
              <Select
                options={movieOptions}
                placeholder="Chọn phim..."
                isSearchable={true}
                className="mr-5"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "transparent",
                    borderColor: state.isFocused ? "#3b82f6" : "#9ca3af", // blue-500 / gray-400
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#3b82f6",
                    },
                    color: "#fff",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#9ca3af", // text-gray-400
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937", // gray-800
                    color: "#fff",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#2563eb"
                      : "transparent", // blue-600
                    color: state.isFocused ? "#fff" : "#fff",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                      color: "#fff",
                    },
                  }),
                }}
              />
              <Select
                options={movieOptions}
                placeholder="Chọn phim..."
                isSearchable={true}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "transparent",
                    borderColor: state.isFocused ? "#3b82f6" : "#9ca3af", // blue-500 / gray-400
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#3b82f6",
                    },
                    color: "#fff",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#9ca3af", // text-gray-400
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937", // gray-800
                    color: "#fff",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "#2563eb"
                      : "transparent", // blue-600
                    color: state.isFocused ? "#fff" : "#fff",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                      color: "#fff",
                    },
                  }),
                }}
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              <Plus className="w-5 h-5" /> Thêm tập phim
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4"></div>
        </div>
      </div>
    </>
  );
};

export default Episode;
