const service = require("../services/season.Service");

exports.createSeason = async (req, res) => {
  try {
    const { movieId } = req.params;
    const season = await service.createSeason(movieId, req.body);
    res.status(201).json(season);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSeasonsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const seasons = await service.getSeasonsByMovie(movieId);
    res.json(seasons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSeasonById = async (req, res) => {
  try {
    const season = await service.getSeasonById(req.params.id);
    if (!season) return res.status(404).json({ error: "Not found" });
    res.json(season);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSeason = async (req, res) => {
  try {
    const season = await service.updateSeason(req.params.id, req.body);
    res.json(season);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSeason = async (req, res) => {
  try {
    await service.deleteSeason(req.params.id);
    res.status(204).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
