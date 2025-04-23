import React from "react";
import AreaChart from "../../components/Charts/AreaChart";
import LineChart from "../../components/Charts/LineChart";
import ColumnChart from "../../components/Charts/ColumnChart";
import BarChart from "../../components/Charts/BarChart";
import PieChart from "../../components/Charts/PieChart";
import DonutChart from "../../components/Charts/DonutChart";
import RadialChart from "../../components/Charts/RadialChart";
const Dashboard = () => {
  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        {/* Quick Stats */}
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Tổng quan</h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col justify-center items-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng số phim</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">245</p>
                </div>
                <div className="flex flex-col justify-center items-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng người dùng</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">1,029</p>
                </div>
                <div className="flex flex-col justify-center items-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Tổng đánh giá</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">3,568</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">🕒 Phim mới trong tuần</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">36 phim mới</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">🧩 Tổng số diễn viên</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">1,700 người</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">⭐ Đánh giá trung bình phim</p>
                    <p className="text-2xl font-bold text-yellow-500">4.3/5</p>
                </div>
                <div className="flex flex-col justify-center items-center p-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">🧑‍💼 Admin đang hoạt động</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">3 quản trị viên</p>
                </div>
            </div>
        </div>
        {/* Thống kê hot */}
        <div className="mt-8 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Thống kê hot</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Phim được xem nhiều nhất hôm nay</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">Avatar 2 (5,400 views)</p>
            </div>
            <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Người dùng đăng nhập gần nhất</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">huyluu2903@gmail.com</p>
            </div>
            <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Admin hoạt động cuối</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">Admin - 10 phút trước</p>
            </div>
            <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Thể loại đang thịnh hành</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">Comedy, Crime, Anime</p>
            </div>
            <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Phim được đánh giá cao nhất</p>
              <p className="text-xl font-semibold text-yellow-500">Interstellar (4.9/5)</p>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="flex items-center justify-center mb-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
        <LineChart
          title="Lượt xem phim theo tháng"
          data={[
            { month: 'Tháng 1', views: 1200 },
            { month: 'Tháng 2', views: 1500 },
            { month: 'Tháng 3', views: 1800 },
            { month: 'Tháng 4', views: 2200 }
          ]}
        />
        </div>

        {/* Chi tiết thống kê */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim đang chiếu</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">85</p>
          </div>
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim sắp chiếu</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">42</p>
          </div>
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Đánh giá trung bình</p>
            <p className="text-xl font-semibold text-yellow-500">4.3 ⭐</p>
          </div>
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Đánh giá cao nhất</p>
            <p className="text-xl font-semibold text-yellow-400">5.0 ⭐</p>
          </div>
        </div>

        {/* Another Chart Placeholder */}
        <div className="flex items-center justify-center mb-4 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
        <DonutChart
          title="Phân loại thể loại phim"
          data={[
            { name: 'Phim hành động', value: 52 },
            { name: 'Phim tình cảm', value: 34 },
            { name: 'Phim hài', value: 29 },
            { name: 'Phim kinh dị', value: 18 }
          ]}
        />
        </div>

        {/* Section cuối nếu cần thêm */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim hành động</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">52</p>
          </div>
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim tình cảm</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">34</p>
          </div>
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim hài</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">29</p>
          </div>
          <div className="flex flex-col items-center justify-center h-28 rounded-sm bg-gray-50 dark:bg-gray-800 shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim kinh dị</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">18</p>
          </div>
        </div>

        {/* Các phần khác như: đánh giá gần đây, phim mới nhất */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Đánh giá gần đây nhất</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Phim: Avengers: Endgame</p>
            <p className="text-gray-800 dark:text-white text-xl">5.0 ⭐</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">"Phim tuyệt vời! Một trải nghiệm không thể bỏ qua."</p>
          </div>
        </div>

        {/* Lịch hoạt động phim sắp chiếu */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Phim sắp chiếu</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
            <ul className="space-y-4">
              <li>
                <p className="text-gray-800 dark:text-white text-lg">Avatar 2 - 10/05/2025</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Ngày chiếu: 10/05/2025 - 10:00 AM</p>
              </li>
              <li>
                <p className="text-gray-800 dark:text-white text-lg">Spider-Man: No Way Home - 15/06/2025</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Ngày chiếu: 15/06/2025 - 10:00 AM</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
