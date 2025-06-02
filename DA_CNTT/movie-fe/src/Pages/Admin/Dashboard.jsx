import React, { useState, useEffect } from "react";
import AreaChart from "../../components/Charts/AreaChart";
import LineChart from "../../components/Charts/LineChart";
import DonutChart from "../../components/Charts/DonutChart";
import BarChart from "../../components/Charts/BarChart";
import RadialChart from "../../components/Charts/RadialChart";
import CardSkeleton from "../../components/Skeleton/CardSkeleton";
import ChartSkeleton from "../../components/Skeleton/ChartSkeleton";
import ActivitySkeleton from "../../components/Skeleton/ActivitySkeleton";
import axiosInstance from "../../config/axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalEpisodes: 0,
    totalRatings: 0,
    totalComments: 0,
    averageRating: "0"
  });
  const [monthlyViews, setMonthlyViews] = useState([]);
  const [genreDistribution, setGenreDistribution] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [completionRate, setCompletionRate] = useState({
    totalEpisodes: 0,
    completedViews: 0,
    completionRate: "0"
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch overall statistics
        const statsResponse = await axiosInstance.get('/api/dashboard/stats');
        setStats(statsResponse.data);

        // Fetch monthly views
        const viewsResponse = await axiosInstance.get('/api/dashboard/monthly-views');
        setMonthlyViews(viewsResponse.data);

        // Fetch genre distribution
        const genreResponse = await axiosInstance.get('/api/dashboard/genre-distribution');
        setGenreDistribution(genreResponse.data.map(genre => ({
          name: genre.name,
          value: genre.movieCount
        })));

        // Fetch recent activities
        const activitiesResponse = await axiosInstance.get('/api/dashboard/recent-activities');
        setRecentActivities(activitiesResponse.data);

        // Fetch top movies
        const topMoviesResponse = await axiosInstance.get('/api/dashboard/top-movies');
        setTopMovies(topMoviesResponse.data.map(movie => ({
          name: movie.title,
          value: movie.viewCount
        })));

        // Fetch completion rate
        const completionResponse = await axiosInstance.get('/api/dashboard/completion-rate');
        setCompletionRate(completionResponse.data);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        // Simulating loading delay for better UX
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        {/* Quick Stats */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tổng quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng số phim</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalMovies}</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng người dùng</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalUsers}</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng tập phim</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalEpisodes}</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Đánh giá trung bình</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.averageRating}/5 ⭐</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {loading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-sm shadow">
                <LineChart 
                  title="Lượt xem theo tháng"
                  data={monthlyViews.map(item => ({
                    name: `Tháng ${item.month}`,
                    value: item.views
                  }))}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-sm shadow">
                <DonutChart 
                  title="Phân bố thể loại phim"
                  data={genreDistribution}
                />
              </div>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Hoạt động gần đây</h3>
          {loading ? (
            <ActivitySkeleton />
          ) : (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-sm shadow">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`bg-${activity.type === 'comment' ? 'blue' : 'yellow'}-100 dark:bg-${activity.type === 'comment' ? 'blue' : 'yellow'}-900 p-2 rounded-full`}>
                        <svg className={`w-4 h-4 text-${activity.type === 'comment' ? 'blue' : 'yellow'}-600 dark:text-${activity.type === 'comment' ? 'blue' : 'yellow'}-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={activity.type === 'comment' ? "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" : "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.username} {activity.type === 'comment' ? 'đã bình luận về' : 'đã đánh giá'} {activity.movieTitle}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.type === 'comment' ? activity.content : `${activity.rating}/5 ⭐`}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.createdAt).toLocaleString('vi-VN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {loading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-sm shadow">
                <BarChart 
                  title="Top 5 phim xem nhiều nhất"
                  data={topMovies}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-sm shadow">
                <RadialChart 
                  title="Tỷ lệ hoàn thành xem phim"
                  percentage={Number(completionRate.completionRate)}
                  subtitle={`${completionRate.completedViews} lượt xem hoàn thành / ${completionRate.totalEpisodes} tập phim`}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
