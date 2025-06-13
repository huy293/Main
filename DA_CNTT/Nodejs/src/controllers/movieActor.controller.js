const service = require('../services/movieActor.Service');
const { Log } = require("../models");

// 1. Thêm actor vào phim
exports.addActorToMovie = async (req, res) => {
  try {
    const result = await service.addActorToMovie(req.body);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin thêm actor vào movie: ${JSON.stringify(req.body)}`,
        time: new Date()
      });
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// 2. Lấy danh sách actor của phim
exports.getActorsOfMovie = async (req, res) => {
  try {
    const result = await service.getActorsOfMovie(req.params.seasonId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Cập nhật vai trò
exports.updateActorRole = async (req, res) => {
  try {
    const result = await service.updateActorRole({
      seasonId: req.params.seasonId,
      peopleId: req.params.peopleId,
      role: req.body.role,
    });

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin cập nhật vai trò actor (peopleId: ${req.params.peopleId}) cho season ${req.params.seasonId} thành "${req.body.role}"`,
        time: new Date()
      });
    }

    res.json({ message: 'Cập nhật vai trò thành công', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Xóa actor khỏi phim
exports.removeActorFromMovie = async (req, res) => {
  try {
    await service.removeActorFromMovie(req.params);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin xóa actor (peopleId: ${req.params.peopleId}) khỏi season/movie`,
        time: new Date()
      });
    }

    res.json({ message: 'Đã xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Lấy danh sách phim mà người đó từng tham gia
exports.getMoviesOfActor = async (req, res) => {
  try {
    const result = await service.getMoviesOfActor(req.params.peopleId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 