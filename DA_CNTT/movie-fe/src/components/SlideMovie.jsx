import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import GroupBT from "./CustomButton/GroupBT";
import { Default_Button_Blue, Default_Button_Red } from "./CustomButton/BT1";
import Details from "./Modal/Details";
import { useNavigate } from 'react-router-dom'; // Thêm nếu chưa có

const SlideMovie = ({ title, SeasonsList }) => {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const navigate = useNavigate(); // Thêm trong function component

  const openDetailModal = (season) => {
    setSelectedSeason(season);
    setDetailModalOpen(true);
  };

  const closeModals = () => {
    setDetailModalOpen(false);
    setSelectedSeason(null);
  };

  return (
    <div className="dark:bg-gray-900 px-20 py-5 overflow-visible relative z-0">
      <h1 className="text-white pb-3 text-2xl">{title}</h1>

      <div className="relative w-full overflow-visible z-0">
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper w-full h-full overflow-visible"
        >
          {SeasonsList.map((season) => (
            <SwiperSlide
              key={season.id}
              className="relative group z-10 hover:z-50 overflow-visible transition-transform duration-300 transform"
            >
              <div className="origin-center relative w-full h-full rounded-lg">
                <img
                  src={season.backdrop_url}
                  alt={season.title}
                  className="w-full h-auto object-cover rounded-lg"
                />

                <div className="absolute group-hover:hidden bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white rounded-b-lg">
                  <h3 className="text-lg">{season.Movie?.title} - {season.title}</h3>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-lg">
                <h3 className="text-xl font-bold mb-2 truncate">{season.Movie?.title} - {season.title}</h3>
                <p className="mt-2 text-sm">⭐ {season.rating}</p>
                <GroupBT className="absolute bottom-0 left-0 right-0 p-4 items-center">
                  <Default_Button_Blue
                    content={"Xem phim"}
                    onClick={() => navigate(`/movie/${season.id}`)}
                  />
                  <Default_Button_Red onClick={() => openDetailModal(season)} content={"Chi tiết"} />
                </GroupBT>
              </div>
            </SwiperSlide>
          ))}
          {isDetailModalOpen && selectedSeason && (
            <Details Season={selectedSeason} onClose={closeModals} />
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default SlideMovie;
