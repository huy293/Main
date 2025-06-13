const { MovieActor, People, Season } = require('../models');

// 1. Thêm actor vào phim
exports.addActorToMovie = async ({ seasonId, peopleId, role }) => {
  return await MovieActor.create({ seasonId, peopleId, role });
};

// 2. Lấy danh sách actor của phim
exports.getActorsOfMovie = async (seasonId) => {
  return await MovieActor.findAll({
    where: { seasonId },
    include: [{ model: People, attributes: ['id', 'name'] }],
  });
};

// 3. Cập nhật vai trò
exports.updateActorRole = async ({ seasonId, peopleId, role }) => {
  return await MovieActor.update(
    { role },
    { where: { seasonId, peopleId } }
  );
};

// 4. Xóa actor khỏi phim
exports.removeActorFromMovie = async ({ seasonId, peopleId }) => {
  return await MovieActor.destroy({ where: { seasonId, peopleId } });
};

// 5. Lấy danh sách phim mà người đó từng tham gia
exports.getMoviesOfActor = async (peopleId) => {
  return await MovieActor.findAll({
    where: { peopleId },
    include: [{ model: Season, attributes: ['id', 'title'] }],
  });
}; 