import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from '../../config/axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import { FaStar } from 'react-icons/fa';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const type = searchParams.get('type');
    const filter = searchParams.get('filter');
    const genre = searchParams.get('genre');
    
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                let endpoint = '/api/season';
                
                if (query) {
                    endpoint = `/api/season/search?query=${encodeURIComponent(query)}`;
                    setPageTitle(`Kết quả tìm kiếm cho: ${query}`);
                } else if (type) {
                    endpoint = `/api/season/by-type?type=${type}`;
                    setPageTitle(type === 'movie' ? 'Phim lẻ' : 'Phim bộ');
                } else if (filter) {
                    endpoint = `/api/season/${filter}`;
                    setPageTitle(filter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
                } else if (genre) {
                    endpoint = `/api/season/by-genre/${genre}`;
                    setPageTitle('Phim theo thể loại');
                }

                const response = await axios.get(endpoint);
                setSearchResults(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching results:', err);
                setError('Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, type, filter, genre]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-gray-900/20 to-gray-900/20">
            <div className="container mx-auto px-4 py-24">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {pageTitle}
                    </h1>
                    <p className="text-gray-400">
                        Tìm thấy {searchResults.length} kết quả
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-8">
                        {error}
                    </div>
                ) : searchResults.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                        Không tìm thấy kết quả nào phù hợp
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {searchResults.map((season) => (
                            <MovieCard
                                key={season.id}
                                season={season}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search; 
