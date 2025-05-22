const { MovieCrew, People, Season } = require('../models');

// 1. Thêm crew vào phim
exports.addCrewToMovie = async ({ seasonId, peopleId, job }) => {
  return await MovieCrew.create({ seasonId, peopleId, job });
};

// 2. Lấy danh sách crew của phim
exports.getCrewsOfMovie = async (seasonId) => {
  return await MovieCrew.findAll({
    where: { seasonId },
    include: [{ model: People, attributes: ['id', 'name'] }],
  });
};

// 3. Cập nhật công việc
exports.updateCrewJob = async ({ seasonId, peopleId, job }) => {
  return await MovieCrew.update(
    { job },
    { where: { seasonId, peopleId } }
  );
};

// 4. Xóa crew khỏi phim
exports.removeCrewFromMovie = async ({ seasonId, peopleId }) => {
  return await MovieCrew.destroy({ where: { seasonId, peopleId } });
};

// 5. Lấy danh sách phim mà người đó từng làm crew
exports.getMoviesOfCrew = async (peopleId) => {
  return await MovieCrew.findAll({
    where: { peopleId },
    include: [{ model: Season, attributes: ['id', 'title'] }],
  });
};
