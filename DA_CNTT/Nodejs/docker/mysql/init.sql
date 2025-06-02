-- Tạo database nếu chưa tồn tại
CREATE DATABASE IF NOT EXISTS HH_Movie;

-- Sử dụng database
USE HH_Movie;

-- Cấp tất cả quyền cho user huydev
GRANT ALL PRIVILEGES ON HH_Movie.* TO 'huydev'@'%';
FLUSH PRIVILEGES; 