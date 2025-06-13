const episodeService = require("../services/episode.Service");
const { Log } = require("../models");

exports.createEpisode = async (req, res) => {
  try {
    const episode = await episodeService.createEpisode(req.body);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin tạo episode mới: ${JSON.stringify(req.body)}`,
        time: new Date()
      });
    }

    res.status(201).json(episode);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const updated = await episodeService.updateEpisode(req.params.id, req.body);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin cập nhật episode ${req.params.id}: ${JSON.stringify(req.body)}`,
        time: new Date()
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    await episodeService.deleteEpisode(req.params.id);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin xóa episode ${req.params.id}`,
        time: new Date()
      });
    }

    res.json({ message: "Episode deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEpisodesBySeason = async (req, res) => {
  try {
    const episodes = await episodeService.getEpisodesBySeason(req.params.seasonId);
    res.json(episodes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getEpisodeById = async (req, res) => {
    try {
      const episode = await episodeService.getEpisodeById(req.params.id);
      if (!episode) return res.status(404).json({ error: "Not found" });
      res.json(episode);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };