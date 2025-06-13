import { useState, useRef, useEffect } from "react";
import logo from '../../assets/logo500.png';
import {Gradient_outline_Blue, Gradient_outline_Red} from '../../components/CustomButton/BT1';
import Login from "../../components/Modal/Login";
import Register from "../../components/Modal/Register";
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { API_URL } from '../../config/config';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
    const [isVerifyCodeModalOpen, setVerifyCodeModalOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const { user, loading, recheckAuth } = useUser();

    const closeModals = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('/api/genre');
                setGenres(response.data);
            } catch (err) {
                console.error('Lỗi khi fetch thể loại:', err);
            }
        };
        fetchGenres();
    }, []);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            try {
                const response = await axios.get(`/api/season/search?query=${encodeURIComponent(query)}`);
                setSearchResults(response.data);
                setShowResults(true);
            } catch (error) {
                console.error('Error searching seasons:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            setShowResults(false);
            setSearchQuery('');
        }
    };

    const handleResultClick = (movieId) => {
        setShowResults(false);
        setSearchQuery('');
        navigate(`/movie/${movieId}`);
    };

    const handleTypeClick = (type) => {
        navigate(`/search?type=${type}`);
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout', {}, {
                withCredentials: true
            });
            recheckAuth();
            setIsUserDropdownOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <header className="fixed top-0 z-50 w-full">
            <nav className="border-gray-200 bg-gradient-to-br from-blue-800/20 to-gray-500/5 backdrop-blur-lg shadow-md">
                <div className="w-full flex flex-wrap items-center justify-between p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-10" alt="HH Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">H<sup>2</sup> Movie</span>
                        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                            <div className="relative mt-3 md:hidden">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    id="search-navbar" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                                <li>
                                    <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleTypeClick('movie')}
                                        className="block w-full text-left py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Phim lẻ
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleTypeClick('series')}
                                        className="block w-full text-left py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        Phim bộ
                                    </button>
                                </li>
                                <li>
                                    <a href="/search?filter=trending" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Trending</a>
                                </li>
                                <li>
                                    <a href="/search?filter=popular" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Popular</a>
                                </li>
                                <li>
                                    <a href="/search?filter=top-rated" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Top Rated</a>
                                </li>
                                <li>
                                    <a href="/search?filter=upcoming" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Upcoming</a>
                                </li>
                                <li className="relative group">
                                    <button className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">
                                        Thể loại 
                                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 top-full hidden group-hover:grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-white dark:bg-gray-700 border border-gray-100 rounded-lg shadow-md dark:border-gray-700 text-sm w-max max-w-screen-md">
                                        {genres.length > 0 ? (
                                            genres.map((genre) => (
                                                <a
                                                    key={genre.id}
                                                    href={`/search?genre=${genre.id}`}
                                                    className="break-inside-avoid text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                                                >
                                                    {genre.name}
                                                </a>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">Đang tải...</p>
                                        )}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex md:order-2">
                        <div className="relative hidden md:block">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span className="sr-only">Search icon</span>
                                </div>
                                <input 
                                    type="text" 
                                    id="search-navbar" 
                                    className="block w-60 md:w-80 lg:w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="Search..." 
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </form>
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-700 rounded-lg shadow-lg mt-2 max-h-96 overflow-y-auto z-50">
                                    {searchResults.map((season) => (
                                        <a
                                            key={season.id}
                                            href={`/movie/${season.id}`}
                                            className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleResultClick(season.id);
                                            }}
                                        >
                                            <img
                                                src={season.poster_url || 'https://via.placeholder.com/50x75'}
                                                alt={season.title}
                                                className="w-12 h-18 object-cover rounded"
                                            />
                                            <div className="ml-3">
                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                    {season.Movie?.title} - {season.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {season.Movie?.type === 'movie' ? 'Phim lẻ' : 'Phim bộ'} • {season.release_date?.split('-')[0]}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative" ref={dropdownRef}>
                        <div className="flex items-center space-x-6">
                            {loading ? (
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            ) : user ? (
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={user.avatar ? `${API_URL}${user.avatar}` : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                                            alt="user photo"
                                        />
                                    </button>

                                    {/* Dropdown menu */}
                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-lg dark:bg-gray-700">
                                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                <div>{user.username}</div>
                                                <div className="font-medium truncate">{user.email}</div>
                                            </div>
                                            <ul className="py-2">
                                                <li>
                                                    <a
                                                        href="/profile"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                                    >
                                                        Thông tin tài khoản
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="/favorites"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                                    >
                                                        Danh sách yêu thích
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="/history"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                                    >
                                                        Lịch sử xem phim
                                                    </a>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                                                    >
                                                        Đăng xuất
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Gradient_outline_Blue onClick={() => setLoginModalOpen(true)} content="Login" />
                                    {isLoginModalOpen && (
                                        <Login
                                            onClose={closeModals}
                                            onRegisterClick={() => {
                                                setLoginModalOpen(false);
                                                setRegisterModalOpen(true);
                                            }}
                                            onLoginSuccess={() => {
                                                recheckAuth();
                                                closeModals();
                                                window.location.reload();
                                            }}
                                        />
                                    )}
                                    {isRegisterModalOpen && (
                                        <Register
                                            onClose={closeModals}
                                            onLoginClick={() => {
                                                setRegisterModalOpen(false);
                                                setLoginModalOpen(true);
                                            }}b
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;