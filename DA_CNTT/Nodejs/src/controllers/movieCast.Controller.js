const service = require('../services/movieCast.Service');

// 1. Thêm người vào phim
exports.addPersonToMovie = async (req, res) => {
  try {
    const result = await service.addPersonToMovie(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Lấy người trong phim
exports.getPeopleOfMovie = async (req, res) => {
  try {
    const result = await service.getPeopleOfMovie(req.params.seasonId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Cập nhật vai trò
exports.updatePersonRole = async (req, res) => {
  try {
    const result = await service.updatePersonRole({
      seasonId: req.params.seasonId,
      peopleId: req.params.peopleId,
      role: req.body.role,
    });
    res.json({ message: 'Cập nhật vai trò thành công', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Xoá người khỏi phim
exports.removePersonFromMovie = async (req, res) => {
  try {
    await service.removePersonFromMovie(req.params);
    res.json({ message: 'Đã xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Lấy phim người đó đã tham gia
exports.getMoviesOfPerson = async (req, res) => {
  try {
    const result = await service.getMoviesOfPerson(req.params.peopleId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
