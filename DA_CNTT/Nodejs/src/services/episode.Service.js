const { Episode } = require("../models");

exports.createEpisode = async (episodeData) => {
  return await Episode.create(episodeData);
};

exports.updateEpisode = async (id, episodeData) => {
  const episode = await Episode.findByPk(id);
  if (!episode) throw new Error("Episode not found");
  return await episode.update(episodeData);
};

exports.deleteEpisode = async (id) => {
  const episode = await Episode.findByPk(id);
  if (!episode) throw new Error("Episode not found");
  return await episode.destroy();
};

exports.getEpisodesBySeason = async (seasonId) => {
  return await Episode.findAll({ where: { seasonId }, order: [["episode_number", "ASC"]] });
};

exports.getEpisodeById = async (id) => {
  return await Episode.findByPk(id);
};