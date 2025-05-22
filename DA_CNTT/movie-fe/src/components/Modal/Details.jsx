import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Gradient_outline_Blue, Gradient_outline_Red } from "../CustomButton/BT1";
const Details = ({ Movie, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      };
  
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${Movie.id}?language=en-US`, options);
        const data = await res.json();
        setMovieDetail(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
  
    if (Movie) {
      fetchMovieDetails();
    }
  }, [Movie]);
  
  useEffect(() => {
    const fetchTrailer = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      };
  
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${Movie.id}/videos`, options);
        const data = await res.json();
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
  
    if (Movie) {
      fetchTrailer();
    }
  }, [Movie]);
  
  return ReactDOM.createPortal(
    <div
      tabIndex="-1"
      aria-hidden="true"
      onClick={onClose}
      className="fixed top-0 left-0 z-[999] flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto backdrop-blur-sm"
    >
      <div className="relative p-4 w-full max-w-3xl max-h-full"
      onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h2 className="text-lg text-white font-semibold">
            {movieDetail?.title || 'Đang tải...'}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4">
            {trailerKey ? (
                <div className="relative w-full pt-[56.25%] mb-4">
                <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
                </div>
            ) : (
                <p className="text-gray-300 mb-4">Không tìm thấy trailer.</p>
            )}
            {movieDetail ? (
                <div className="text-white space-y-2">
                <h3 className="text-xl font-bold">{movieDetail.title}</h3>
                <p><strong>Ngày phát hành:</strong> {movieDetail.release_date}</p>
                <p><strong>Điểm đánh giá:</strong> {movieDetail.vote_average} / 10</p>
                <p><strong>Thời lượng:</strong> {movieDetail.runtime} phút</p>
                <p><strong>Ngôn ngữ:</strong> {movieDetail.original_language.toUpperCase()}</p>
                <p><strong>Thể loại:</strong> {movieDetail.genres.map(g => g.name).join(', ')}</p>
                <p><strong>Mô tả:</strong> {movieDetail.overview}</p>
                <p><strong>Trạng thái:</strong> {movieDetail.status}</p>
                <p><strong>Doanh thu:</strong> {movieDetail.revenue.toLocaleString()} USD</p>

                <div className="flex gap-3 mt-4">
                    <Gradient_outline_Blue
                    content={"Xem phim"}
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                    </Gradient_outline_Blue>

                    <Gradient_outline_Red
                    content={"Thêm danh sách"}
                    onClick={() => alert("Đã thêm vào danh sách yêu thích!")}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                    </Gradient_outline_Red>
                </div>
                </div>
            ) : (
                <p className="text-gray-300">Đang tải thông tin phim...</p>
            )}
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Details;
