const { Season, Episode, Movie } = require("../models");

exports.createSeason = async (movieId, data) => {
    const movie = await Movie.findByPk(movieId);
    if (!movie || movie.type !== "series") {
    throw new Error("Only series movies can have seasons." );
    }
  return await Season.create({ ...data, movieId });
};

exports.getSeasonsByMovie = async (movieId) => {
  return await Season.findAll({
    where: { movieId },
    order: [["season_number", "ASC"]],
    include: [{ model: Episode }],
  });
};

exports.getSeasonById = async (id) => {
  return await Season.findByPk(id, {
    include: [{ model: Episode }],
  });
};

exports.updateSeason = async (seasonId, data) => {
    const season = await Season.findByPk(seasonId);
    if (!season) {
      throw new Error("Season not found");
    }
  
    await season.update(data);
  
    return season;
  };

exports.deleteSeason = async (id) => {
  return await Season.destroy({ where: { id } });
};
