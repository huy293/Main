const episodeService = require("../services/episode.Service");

exports.createEpisode = async (req, res) => {
  try {
    const episode = await episodeService.createEpisode(req.body);
    res.status(201).json(episode);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const updated = await episodeService.updateEpisode(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    await episodeService.deleteEpisode(req.params.id);
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