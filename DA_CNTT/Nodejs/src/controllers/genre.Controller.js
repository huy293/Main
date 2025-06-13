const genreService = require('../services/genre.Service');
const { Log } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const genres = await genreService.GetAll();
    return res.status(200).json(genres); 
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL params
  try {
    const genre = await genreService.GetById(id);
    if (!genre) {
      return res.status(404).json({ error: 'Genre not found' });
    }
    return res.status(200).json(genre);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const { name } = req.body;
  try {
    const genre = await genreService.Create(name);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin tạo thể loại mới: "${name}"`,
        time: new Date()
      });
    }

    return res.status(201).json(genre);
  } catch (error) {
    return res.status(500).json({ error: error.message }); 
  }
};

exports.update = async (req, res) => {
  const { id } = req.params; 
  const { name } = req.body; 
  try {
    const genre = await genreService.Update(id, name);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin cập nhật thể loại ${id} thành "${name}"`,
        time: new Date()
      });
    }

    return res.status(200).json(genre);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await genreService.Delete(id);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin xóa thể loại ${id}`,
        time: new Date()
      });
    }

    return res.status(200).json({ message: "Genre deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
