import { useState, useEffect} from 'react'
import Header from './Header'
import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import SlideMovie from '../../components/SlideMovie'
import '../../index.css';

function Home() {
  const [trendingMovies, settrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        }
      };
  
      const urls = {
        trending: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
        popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        topRated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      };
  
      const [trending, popularRes, topRatedRes, upcomingRes, nowPlayingRes] = await Promise.all([
        fetch(urls.trending, options),
        fetch(urls.popular, options),
        fetch(urls.topRated, options),
        fetch(urls.upcoming, options),
        fetch(urls.nowPlaying, options),
      ]);
  
      const [trendingData, popularData, topRatedData, upcomingData, nowPlayingData] = await Promise.all([
        trending.json(),
        popularRes.json(),
        topRatedRes.json(),
        upcomingRes.json(),
        nowPlayingRes.json(),
      ]);
      settrendingMovies(trendingData.results);
      setPopularMovies(popularData.results);
      setTopRatedMovies(topRatedData.results);
      setUpcomingMovies(upcomingData.results);
      setNowPlayingMovies(nowPlayingData.results);
    };
  
    fetchData();
  }, []);
  
  return (
    <>
    <Header />
    <Banner MoviesList={trendingMovies}/>
    <SlideMovie title="Phim đề cử" MoviesList={popularMovies} />
    <SlideMovie title="Phim hay" MoviesList={topRatedMovies} />
    <SlideMovie title="Sắp chiếu" MoviesList={upcomingMovies} />
    <SlideMovie title="Đang chiếu" MoviesList={nowPlayingMovies} />
    <Footer />
    </>
  )
}

export default Home;