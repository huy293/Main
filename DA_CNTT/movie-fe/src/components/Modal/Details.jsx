import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Gradient_outline_Blue, Gradient_outline_Red } from "../CustomButton/BT1";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

const Details = ({ Season, onClose }) => {
  const [seasonDetail, setSeasonDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Season) {
      setSeasonDetail(Season);
      setLoading(false);
    }
  }, [Season]);

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayerReady = (event) => {
    setPlayer(event.target);
  };

  const handlePlay = () => {
    if (seasonDetail?.Episodes?.length > 0) {
      navigate(`/watch/${seasonDetail.id}/${seasonDetail.Episodes[0].id}`);
    }
  };

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    alert("Đã thêm vào danh sách yêu thích!");
  };

  return ReactDOM.createPortal(
    <div
      tabIndex="-1"
      aria-hidden="true"
      onClick={onClose}
      className="fixed top-0 left-0 z-[999] flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-auto backdrop-blur-sm"
    >
      <div 
        className="relative p-4 w-full max-w-3xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gray-900 rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-700">
            <h2 className="text-lg text-white font-semibold">
              {seasonDetail?.Movie?.title} - {seasonDetail?.title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="end-2.5 text-white bg-transparent hover:bg-gray-700 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : seasonDetail ? (
              <div className="text-white space-y-4">
                <div className="relative w-full pt-[56.25%] mb-4">
                  {seasonDetail.trailer_url && (seasonDetail.trailer_url.includes('youtube.com') || seasonDetail.trailer_url.includes('youtu.be')) ? (
                    <YouTube
                      videoId={getYouTubeId(seasonDetail.trailer_url)}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                          autoplay: 0,
                          controls: 1,
                          modestbranding: 1,
                          showinfo: 0,
                          rel: 0,
                        },
                      }}
                      onReady={handlePlayerReady}
                    />
                  ) : seasonDetail.trailer_url ? (
                    <video
                      src={seasonDetail.trailer_url}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      controls
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400">Không có video</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{seasonDetail.Movie?.title} - {seasonDetail.title}</h3>
                  <p><strong>Loại:</strong> {seasonDetail.Movie?.type === 'movie' ? 'Phim lẻ' : 'Phim bộ'}</p>
                  <p><strong>Ngày phát hành:</strong> {new Date(seasonDetail.release_date).toLocaleDateString()}</p>
                  <p><strong>Thể loại:</strong> {seasonDetail.Movie?.MovieGenres?.map(mg => mg.Genre.name).join(', ')}</p>
                  <p><strong>Mô tả:</strong> {seasonDetail.description || 'Chưa có mô tả'}</p>
                </div>

                {seasonDetail.Episodes && seasonDetail.Episodes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Danh sách tập</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {seasonDetail.Episodes.map(episode => (
                        <div 
                          key={episode.id}
                          className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700"
                          onClick={() => navigate(`/watch/${seasonDetail.id}/${episode.id}`)}
                        >
                          <p className="text-white font-medium">Tập {episode.episode_number}</p>
                          <p className="text-gray-400 text-sm">{episode.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <Gradient_outline_Blue
                    content={"Xem phim"}
                    onClick={handlePlay}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  />

                  <Gradient_outline_Red
                    content={"Thêm danh sách"}
                    onClick={handleFavorite}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-300">Không tìm thấy thông tin phim</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Details;
