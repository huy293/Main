const { MovieCast, People, Season } = require('../models');

// 1. Thêm người vào phim
exports.addPersonToMovie = async ({ seasonId, peopleId, role }) => {
  return await MovieCast.create({ seasonId, peopleId, role });
};

// 2. Lấy danh sách người và vai trò của phim
exports.getPeopleOfMovie = async (seasonId) => {
  return await MovieCast.findAll({
    where: { seasonId },
    include: [{ model: People, attributes: ['id', 'name'] }],
  });
};

// 3. Cập nhật vai trò
exports.updatePersonRole = async ({ seasonId, peopleId, role }) => {
  return await MovieCast.update(
    { role },
    { where: { seasonId, peopleId } }
  );
};

// 4. Xoá người khỏi phim
exports.removePersonFromMovie = async ({ seasonId, peopleId }) => {
  return await MovieCast.destroy({ where: { seasonId, peopleId } });
};

// 5. Lấy danh sách phim 1 người đã tham gia
exports.getMoviesOfPerson = async (peopleId) => {
  return await MovieCast.findAll({
    where: { peopleId },
    include: [{ model: Season, attributes: ['id', 'title'] }],
  });
};
