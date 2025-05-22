import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const AddSeasonForm = ({ onClose }) => {
  const [Season, setSeason] = useState({
    SeasonID: "",
    season_number: "",
    title: "",
    overview: "",
    release_date: "",
    poster_url: "",
    backdrop_url: "",
    trailer_url: "",
    type: "Season", // default to "Season"
    status: "upcoming",
    runtime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeason({ ...Season, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/Seasons/",
        Season,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Season added successfully:", response.data);
      onClose();

      // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding Season:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[999] flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto backdrop-blur-sm">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-[1300px] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-8">
          Add Season
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="space-y-6 min-h-full">
            <div>
              <label
                htmlFor="title"
                className="block text-white font-semibold mb-2"
              >
                Season Title
              </label>
              <input
                type="text"
                name="title"
                value={Season.title}
                onChange={handleChange}
                placeholder="Season Title"
                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="overview"
                className="block text-white font-semibold mb-2"
              >
                Overview
              </label>
              <textarea
                name="overview"
                value={Season.overview}
                onChange={handleChange}
                placeholder="Overview"
                className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg h-36"
                required
              />
            </div>
            <div>
              <label
                htmlFor="runtime"
                className="block text-white font-semibold mb-2"
              >
                Runtime (minutes)
              </label>
              <input
                type="number"
                name="runtime"
                value={Season.runtime}
                onChange={handleChange}
                placeholder="Runtime"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg"
                required
              />
            </div>
          </div>

          {/* Second Column: poster_url, backdrop_url, trailer_url */}
          <div className="space-y-6 min-h-full">
            <div>
              <label
                htmlFor="poster_url"
                className="block text-white font-semibold mb-2"
              >
                Poster URL
              </label>
              <input
                type="text"
                name="poster_url"
                value={Season.poster_url}
                onChange={handleChange}
                placeholder="Poster URL"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="backdrop_url"
                className="block text-white font-semibold mb-2"
              >
                Backdrop URL
              </label>
              <input
                type="text"
                name="backdrop_url"
                value={Season.backdrop_url}
                onChange={handleChange}
                placeholder="Backdrop URL"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="trailer_url"
                className="block text-white font-semibold mb-2"
              >
                Trailer URL
              </label>
              <input
                type="text"
                name="trailer_url"
                value={Season.trailer_url}
                onChange={handleChange}
                placeholder="Trailer URL"
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg"
                required
              />
            </div>
          </div>

          {/* Third Column: type, status, release_date */}
          <div className="space-y-6 min-h-auto">
            <div>
              <label
                htmlFor="type"
                className="block text-white font-semibold mb-2"
              >
                Type
              </label>
              <select
                name="type"
                value={Season.type}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-lg"
                required
              >
                <option value="Season">Season</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-white font-semibold mb-2"
              >
                Status
              </label>
              <select
                name="status"
                value={Season.status}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-lg"
                required
              >
                <option value="upcoming">Upcoming</option>
                <option value="released">Released</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="release_date"
                className="block text-white font-semibold mb-2"
              >
                Release Date
              </label>
              <input
                type="date"
                name="release_date"
                value={Season.release_date}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 placeholder-gray-400 text-lg"
                required
              />
            </div>
          </div>
          <div className="col-span-3 mt-6">
            <button
              type="submit"
              className="w-full p-4 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 text-lg"
            >
              Add Season
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSeasonForm;
