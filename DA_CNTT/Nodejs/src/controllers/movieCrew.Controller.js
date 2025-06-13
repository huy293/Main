const service = require('../services/movieCrew.Service');
const { Log } = require("../models");

// 1. Thêm crew vào phim
exports.addCrewToMovie = async (req, res) => {
  try {
    const result = await service.addCrewToMovie(req.body);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin thêm crew vào movie: ${JSON.stringify(req.body)}`,
        time: new Date()
      });
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Lấy danh sách crew của phim
exports.getCrewsOfMovie = async (req, res) => {
  try {
    const result = await service.getCrewsOfMovie(req.params.seasonId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Cập nhật công việc của crew
exports.updateCrewJob = async (req, res) => {
  try {
    const result = await service.updateCrewJob({
      seasonId: req.params.seasonId,
      peopleId: req.params.peopleId,
      job: req.body.job,
    });

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin cập nhật job crew (peopleId: ${req.params.peopleId}) cho season ${req.params.seasonId} thành "${req.body.job}"`,
        time: new Date()
      });
    }

    res.json({ message: 'Cập nhật thành công', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Xoá crew khỏi phim
exports.removeCrewFromMovie = async (req, res) => {
  try {
    await service.removeCrewFromMovie(req.params);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin xoá crew (peopleId: ${req.params.peopleId}) khỏi season/movie`,
        time: new Date()
      });
    }

    res.json({ message: 'Đã xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Lấy phim người đó từng làm crew
exports.getMoviesOfCrew = async (req, res) => {
  try {
    const result = await service.getMoviesOfCrew(req.params.peopleId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
