import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import useUser from '../../hooks/useUser';

const History = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/watch-history/${user.id}`);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleRemoveFromHistory = async (historyId) => {
    try {
      await axios.delete(`/api/watch-history/${historyId}`);
      setHistory(prev => prev.filter(item => item.id !== historyId));
    } catch (error) {
      console.error('Error removing from history:', error);
    }
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete('/api/user/history');
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Lịch sử xem phim</h1>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 text-red-600 hover:text-red-700 focus:outline-none"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Bạn chưa xem phim nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFromHistory(item.id)}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Đã xem: {new Date(item.watchedAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => navigate(`/movie/${item.movieId}`)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Xem lại
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History; 