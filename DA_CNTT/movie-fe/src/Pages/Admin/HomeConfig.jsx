import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

const HomeConfig = () => {
  const [allSeasons, setAllSeasons] = useState([]);
  const [config, setConfig] = useState({
    banner: [],
    editorChoice: [],
    monthlyHighlight: [],
    slides: [
      // { title: "Phim đề cử", seasons: [] }
    ],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Lấy tất cả season để chọn
    axios.get("/api/season/all").then(res => setAllSeasons(res.data));
    // Lấy cấu hình hiện tại
    axios.get("/api/home-config").then(res => setConfig(res.data));
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post("/api/home-config", config);
      alert("Lưu cấu hình thành công!");
    } catch (err) {
      alert("Lỗi khi lưu cấu hình!");
    }
    setLoading(false);
  };

  // Hàm chọn season cho từng khu vực
  const handleSelect = (key, values) => {
    setConfig(prev => ({ ...prev, [key]: values }));
  };

  // Thêm/xoá slide động
  const handleAddSlide = () => {
    setConfig(prev => ({
      ...prev,
      slides: [...prev.slides, { title: "", seasons: [] }]
    }));
  };
  const handleSlideChange = (idx, field, value) => {
    setConfig(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) =>
        i === idx ? { ...slide, [field]: value } : slide
      )
    }));
  };
  const handleRemoveSlide = (idx) => {
    setConfig(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Cấu hình trang chủ
        </h1>
        <div className="mb-6">
          <label className="font-semibold">Banner:</label>
          <select
            multiple
            value={config.banner}
            onChange={e =>
              handleSelect(
                "banner",
                Array.from(e.target.selectedOptions, opt => opt.value)
              )
            }
            className="w-full mt-2 mb-4 p-2 rounded"
          >
            {allSeasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="font-semibold">Biên tập viên chọn:</label>
          <select
            multiple
            value={config.editorChoice}
            onChange={e =>
              handleSelect(
                "editorChoice",
                Array.from(e.target.selectedOptions, opt => opt.value)
              )
            }
            className="w-full mt-2 mb-4 p-2 rounded"
          >
            {allSeasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="font-semibold">Phim nổi bật theo tháng:</label>
          <select
            multiple
            value={config.monthlyHighlight}
            onChange={e =>
              handleSelect(
                "monthlyHighlight",
                Array.from(e.target.selectedOptions, opt => opt.value)
              )
            }
            className="w-full mt-2 mb-4 p-2 rounded"
          >
            {allSeasons.map(season => (
              <option key={season.id} value={season.id}>
                {season.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="font-semibold">Các slide động:</label>
          {config.slides.map((slide, idx) => (
            <div key={idx} className="mb-4 border p-2 rounded">
              <input
                type="text"
                placeholder="Tên slide"
                value={slide.title}
                onChange={e => handleSlideChange(idx, "title", e.target.value)}
                className="mb-2 p-2 rounded w-full"
              />
              <select
                multiple
                value={slide.seasons}
                onChange={e =>
                  handleSlideChange(
                    idx,
                    "seasons",
                    Array.from(e.target.selectedOptions, opt => opt.value)
                  )
                }
                className="w-full p-2 rounded"
              >
                {allSeasons.map(season => (
                  <option key={season.id} value={season.id}>
                    {season.title}
                  </option>
                ))}
              </select>
              <button
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => handleRemoveSlide(idx)}
              >
                Xoá slide
              </button>
            </div>
          ))}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAddSlide}
          >
            Thêm slide
          </button>
        </div>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded font-bold"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu cấu hình"}
        </button>
      </div>
    </div>
  );
};

export default HomeConfig;