import { useState, useEffect} from 'react'
import Banner from '../../components/Banner'
import SlideMovie from '../../components/SlideMovie'
import '../../index.css';
import axios from '../../config/axios';

function Home() {
  const [trendingSeasons, setTrendingSeasons] = useState([]);
  const [popularSeasons, setPopularSeasons] = useState([]);
  const [topRatedSeasons, setTopRatedSeasons] = useState([]);
  const [upcomingSeasons, setUpcomingSeasons] = useState([]);
  const [nowPlayingSeasons, setNowPlayingSeasons] = useState([]);
  const [actionSeasons, setActionSeasons] = useState([]);
  const [comedySeasons, setComedySeasons] = useState([]);
  const [dramaSeasons, setDramaSeasons] = useState([]);
  const [horrorSeasons, setHorrorSeasons] = useState([]);
  const [romanceSeasons, setRomanceSeasons] = useState([]);
  const [sciFiSeasons, setSciFiSeasons] = useState([]);
  const [documentarySeasons, setDocumentarySeasons] = useState([]);
  const [animationSeasons, setAnimationSeasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          trending, 
          popular, 
          topRated, 
          upcoming, 
          nowPlaying,
          action,
          comedy,
          drama,
          horror,
          romance,
          sciFi,
          documentary,
          animation
        ] = await Promise.all([
          axios.get('/api/season/trending'),
          axios.get('/api/season/popular'),
          axios.get('/api/season/top-rated'),
          axios.get('/api/season/upcoming'),
          axios.get('/api/season/now-playing'),
          axios.get('/api/season/by-genre/action'),
          axios.get('/api/season/by-genre/comedy'),
          axios.get('/api/season/by-genre/drama'),
          axios.get('/api/season/by-genre/horror'),
          axios.get('/api/season/by-genre/romance'),
          axios.get('/api/season/by-genre/sci-fi'),
          axios.get('/api/season/by-genre/documentary'),
          axios.get('/api/season/by-genre/animation')
        ]);

        setTrendingSeasons(trending.data);
        setPopularSeasons(popular.data);
        setTopRatedSeasons(topRated.data);
        setUpcomingSeasons(upcoming.data);
        setNowPlayingSeasons(nowPlaying.data);
        setActionSeasons(action.data);
        setComedySeasons(comedy.data);
        setDramaSeasons(drama.data);
        setHorrorSeasons(horror.data);
        setRomanceSeasons(romance.data);
        setSciFiSeasons(sciFi.data);
        setDocumentarySeasons(documentary.data);
        setAnimationSeasons(animation.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      <div className="pt-16">
        <Banner SeasonsList={trendingSeasons}/>
        <SlideMovie title="Phim đề cử" SeasonsList={popularSeasons} />
        <SlideMovie title="Phim hay" SeasonsList={topRatedSeasons} />
        <SlideMovie title="Sắp chiếu" SeasonsList={upcomingSeasons} />
        <SlideMovie title="Đang chiếu" SeasonsList={nowPlayingSeasons} />
        <SlideMovie title="Phim Hành Động" SeasonsList={actionSeasons} />
        <SlideMovie title="Phim Hài" SeasonsList={comedySeasons} />
        <SlideMovie title="Phim Tâm Lý" SeasonsList={dramaSeasons} />
        <SlideMovie title="Phim Kinh Dị" SeasonsList={horrorSeasons} />
        <SlideMovie title="Phim Tình Cảm" SeasonsList={romanceSeasons} />
        <SlideMovie title="Phim Khoa Học Viễn Tưởng" SeasonsList={sciFiSeasons} />
        <SlideMovie title="Phim Tài Liệu" SeasonsList={documentarySeasons} />
        <SlideMovie title="Phim Hoạt Hình" SeasonsList={animationSeasons} />
      </div>
    </>
  )
}

export default Home;