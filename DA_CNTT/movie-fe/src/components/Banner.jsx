import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import YouTube from "react-youtube";
import { Gradient_outline_Blue, Gradient_outline_Red } from "./CustomButton/BT1";
import Details from "./Modal/Details";
const Banner = ({ MoviesList }) => {
  
  const [trailers, setTrailers] = useState({});
  const [players, setPlayers] = useState({});
  const [mutedSlides, setMutedSlides] = useState({}); // Lưu trạng thái mute của từng slide
  const swiperRef = useRef(null);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const openDetailModal = (movie) => {
    setSelectedMovie(movie);
    setDetailModalOpen(true);
  };

  const closeModals = () => {
    setDetailModalOpen(false);
    setSelectedMovie(null);
  };
  useEffect(() => {
    const fetchTrailers = async () => {
      const newTrailers = {};

      await Promise.all(
        MoviesList.map(async (movie) => {
          try {
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
                },
              }
            );
            const data = await res.json();
            const trailer = data.results.find(
              (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            if (trailer) newTrailers[movie.id] = trailer.key;
          } catch (err) {
            console.error("Lỗi lấy trailer:", err);
          }
        })
      );

      setTrailers(newTrailers);
    };

    if (MoviesList?.length > 0) {
      fetchTrailers();
    }
  }, [MoviesList]);

  const handlePlayerReady = (movieId) => (event) => {
    const playerInstance = event.target;
    playerInstance.mute();
    playerInstance.playVideo();

    setPlayers((prev) => ({ ...prev, [movieId]: playerInstance }));
    setMutedSlides((prev) => ({ ...prev, [movieId]: true }));
  };
  const handleVideoEnd = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const toggleMute = (movieId) => {
    const player = players[movieId];
    if (player) {
      if (mutedSlides[movieId]) {
        player.unMute();
      } else {
        player.mute();
      }
      setMutedSlides((prev) => ({
        ...prev,
        [movieId]: !prev[movieId],
      }));
    }
  };
  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    const currentMovie = MoviesList[currentIndex];

    Object.entries(players).forEach(([movieId, player]) => {
      if (parseInt(movieId) === currentMovie?.id) {
        player.seekTo(0);
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });
  };
  return (
    <Swiper
      className="w-full h-[100vh]"
      pagination={{ clickable: true }}
      navigation={true}
      rewind={true}
      modules={[Pagination, Navigation]}
      ref={swiperRef}
      onSlideChange={handleSlideChange}
    >
      {MoviesList?.map((movie) => {
        const trailerKey = trailers[movie.id];
        const isMuted = mutedSlides[movie.id];

        return (
          <SwiperSlide
            key={movie.id}
            className="relative flex justify-center items-center"
          >
            {/* Video trailer */}
            {trailerKey ? (
              <YouTube
                videoId={trailerKey}
                className="absolute w-full h-full"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    loop: 0,
                    mute: 1,
                    playlist: trailerKey,
                    rel: 0,
                  },
                }}
                onReady={handlePlayerReady(movie.id)}
                onEnd={handleVideoEnd}
              />
            ) : (
              // Ảnh fallback
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE_Banner}${movie.backdrop_path}`}
                className="absolute w-full h-full object-cover"
                alt={movie.title}
              />
            )}

            {/* Nút bật/tắt tiếng */}
            {trailerKey && (
              <div className="absolute bottom-16 right-1 z-20">
              <Gradient_outline_Blue
                content={isMuted ? "🔇 Tắt tiếng" : "🔊 Bật tiếng"}
                onClick={() => toggleMute(movie.id)}
              >             
              </Gradient_outline_Blue>
              </div>
            )}

            {/* Content */}
            <div className="absolute bottom-1/4 left-40 z-10 text-white max-w-xl text-left">
              <h2 className="text-4xl font-bold drop-shadow-lg">
                {movie.title || movie.name}
              </h2>
              <p className="text-lg mt-2 drop-shadow-md line-clamp-3">
                {movie.overview}
              </p>
              <div className="mt-4">
                <Gradient_outline_Blue content={"Xem phim"} />
                <Gradient_outline_Red onClick={() => openDetailModal(movie)} content={"Chi tiết"} />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      {isDetailModalOpen && selectedMovie && (
            <Details Movie={selectedMovie} onClose={closeModals} />
          )}
    </Swiper>
  );
};

export default Banner;
