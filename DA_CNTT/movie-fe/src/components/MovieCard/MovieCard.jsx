import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaPlay, FaInfoCircle } from 'react-icons/fa';
import Details from "../Modal/Details";

const MovieCard = ({ season }) => {
    const navigate = useNavigate();
    const [isDetailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(null);

    const openDetailModal = () => {
        setSelectedSeason(season);
        setDetailModalOpen(true);
    };

    const closeModals = () => {
        setDetailModalOpen(false);
        setSelectedSeason(null);
    };

    return (
        <>
            <div className="group">
                <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                    {/* Poster Image */}
                    <div className="relative w-full" style={{ paddingTop: '150%' }}>
                        <img
                            src={season.poster_url || 'https://via.placeholder.com/500x750'}
                            alt={season.title}
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        />
                        {/* Overlay with buttons at bottom */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                            <div className="flex gap-1">
                                <button
                                    onClick={() => navigate(`/movie/${season.id}`)}
                                    className="flex-1 bg-blue-600 text-white px-2 py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors text-xs"
                                >
                                    <FaPlay className="text-xs" />
                                    <span>Xem phim</span>
                                </button>
                                <button
                                    onClick={openDetailModal}
                                    className="flex-1 bg-red-600 text-white px-2 py-1 rounded-lg flex items-center justify-center gap-1 hover:bg-red-700 transition-colors text-xs"
                                >
                                    <FaInfoCircle className="text-xs" />
                                    <span>Chi tiết</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Rating badge */}
                    {season.rating && (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold">
                            <FaStar className="text-yellow-400" />
                            {season.rating}
                        </div>
                    )}
                </div>
                <div className="mt-2">
                    <h3 className="font-semibold">{season.Movie?.title} - {season.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                        <span>{season.Movie?.type === 'movie' ? 'Phim lẻ' : 'Phim bộ'}</span>
                        <span>{season.release_date?.split('-')[0]}</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isDetailModalOpen && selectedSeason && (
                <Details Season={selectedSeason} onClose={closeModals} />
            )}
        </>
    );
};

export default MovieCard; 