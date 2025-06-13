import React, { useEffect, useState } from "react";
import LineChart from "../../components/Charts/LineChart";
import DonutChart from "../../components/Charts/DonutChart";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";
import ColumnChart from "../../components/Charts/ColumnChart";

// Statistic Card component
const StatCard = ({ label, value, color = "blue" }) => {
  const colorMap = {
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    orange: "text-orange-600 dark:text-orange-400",
    pink: "text-pink-600 dark:text-pink-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    indigo: "text-indigo-600 dark:text-indigo-400",
    red: "text-red-600 dark:text-red-400",
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className={`text-2xl font-bold ${colorMap[color] || colorMap.blue}`}>{value}</div>
    </div>
  );
};

const Dashboard = () => {
  // Tổng quan
  const [summary, setSummary] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalEpisodes: 0,
    totalRatings: 0,
    totalComments: 0,
    averageRating: 0,
  });

  // Chart & datatable data
  const [monthlyViews, setMonthlyViews] = useState([]);
  const [genreDistribution, setGenreDistribution] = useState([]);
  const [topSeasons, setTopSeasons] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [topFavoriteSeasons, setTopFavoriteSeasons] = useState([]);
  const [topRatedSeasons, setTopRatedSeasons] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [newSeasons, setNewSeasons] = useState([]);
  const [userRoleDistribution, setUserRoleDistribution] = useState([]);
  const [commentsByMonth, setCommentsByMonth] = useState([]);
  const [completionRate, setCompletionRate] = useState({ totalEpisodes: 0, completedViews: 0, completionRate: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Tổng quan
        const resSummary = await fetch("/api/dashboard/stats");
        setSummary(await resSummary.json());

        // Các thống kê khác
        const [
          resViews,
          resGenre,
          resTopSeasons,
          resTopUsers,
          resTopFav,
          resTopRated,
          resNewUsers,
          resNewSeasons,
          resUserRole,
          resComments,
          resCompletion,
        ] = await Promise.all([
          fetch("/api/dashboard/monthly-views"),
          fetch("/api/dashboard/genre-distribution"),
          fetch("/api/dashboard/top-seasons"),
          fetch("/api/dashboard/top-users"),
          fetch("/api/dashboard/top-favorite-movies"),
          fetch("/api/dashboard/top-rated-seasons"),
          fetch("/api/dashboard/newest-users"),
          fetch("/api/dashboard/newest-seasons"),
          fetch("/api/dashboard/user-role-distribution"),
          fetch("/api/dashboard/comments-by-month"),
          fetch("/api/dashboard/completion-rate"),
        ]);
        setMonthlyViews(await resViews.json());
        setGenreDistribution(await resGenre.json());
        setTopSeasons(await resTopSeasons.json());
        setTopUsers(await resTopUsers.json());
        setTopFavoriteSeasons(await resTopFav.json());
        setTopRatedSeasons(await resTopRated.json());
        setNewUsers(await resNewUsers.json());
        setNewSeasons(await resNewSeasons.json());
        setUserRoleDistribution(await resUserRole.json());
        setCommentsByMonth(await resComments.json());
        setCompletionRate(await resCompletion.json());
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-700 mt-14">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Dashboard Thống kê
        </h1>
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-300 py-12">Đang tải dữ liệu...</div>
        ) : (
          <>
            {/* Statistic cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard label="Tổng phim" value={summary.totalMovies} color="blue" />
              <StatCard label="Tổng user" value={summary.totalUsers} color="green" />
              <StatCard label="Tổng tập phim" value={summary.totalEpisodes} color="purple" />
              <StatCard label="Tổng comment" value={summary.totalComments} color="orange" />
              <StatCard label="Tổng rating" value={summary.totalRatings} color="indigo" />
              <StatCard label="Rating trung bình" value={summary.averageRating} color="yellow" />
            </div>

            {/* Tỷ lệ hoàn thành xem phim */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 flex flex-col items-center">
              <h2 className="font-semibold mb-2">Tỷ lệ hoàn thành xem phim</h2>
              <div className="text-3xl font-bold text-blue-600">
                {completionRate.completionRate}%
              </div>
              <div className="text-gray-500 text-sm">
                {completionRate.completedViews} lượt xem hoàn thành / {completionRate.totalEpisodes} tập phim
              </div>
            </div>

            {/* Chart: Lượt xem & Thể loại */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <LineChart
                  title="Lượt xem theo tháng"
                  data={monthlyViews.map(item => ({
                    month: item.month,
                    views: item.count || item.views
                  }))}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <DonutChart
                  title="Phân bố thể loại phim"
                  data={genreDistribution.map(item => ({
                    name: item.name,
                    value: item.movieCount || item.count
                  }))}
                />
              </div>
            </div>

            {/* Chart: Top phim & Top user */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <BarChart
                  title="Top phim xem nhiều nhất"
                  data={topSeasons.map(item => ({
                    name: item.title || (item.season && item.season.title) || "Không rõ",
                    value: item.viewCount
                  }))}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <BarChart
                  title="Top user xem nhiều nhất"
                  data={topUsers.map(item => ({
                    name: item.user?.username || "Không rõ",
                    value: item.viewCount
                  }))}
                />
              </div>
            </div>

            {/* Chart: Top phim yêu thích & rating cao */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <BarChart
                  title="Top phim được yêu thích nhất"
                  data={topFavoriteSeasons.map(item => ({
                    name: item.season?.title || "Không rõ",
                    value: item.favoriteCount
                  }))}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <BarChart
                  title="Top phim rating cao nhất"
                  data={topRatedSeasons.map(item => ({
                    name: item.season?.title || "Không rõ",
                    value: Number(item.avgRating)
                  }))}
                />
              </div>
            </div>

            {/* Chart: Số lượng comment theo tháng & Pie user role */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <ColumnChart
                  title="Số lượng comment theo tháng"
                  data={commentsByMonth.map(item => ({
                    name: `Tháng ${item.month}`,
                    value: item.count
                  }))}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <PieChart
                  title="Tỷ lệ user theo vai trò"
                  data={userRoleDistribution.map(item => ({
                    name: item.role,
                    value: item.count
                  }))}
                />
              </div>
            </div>

            {/* Datatable: User mới nhất */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
              <h2 className="font-semibold mb-2">Bảng: User mới nhất</h2>
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Ngày đăng ký</th>
                  </tr>
                </thead>
                <tbody>
                  {newUsers.map((user, idx) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.createdAt?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Datatable: Phim mới nhất */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 overflow-x-auto">
              <h2 className="font-semibold mb-2">Bảng: Phim mới nhất</h2>
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Tên phim</th>
                    <th className="px-4 py-2">Ngày thêm</th>
                  </tr>
                </thead>
                <tbody>
                  {newSeasons.map((item, idx) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2">{item.title}</td>
                      <td className="px-4 py-2">{item.createdAt?.slice(0, 10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;