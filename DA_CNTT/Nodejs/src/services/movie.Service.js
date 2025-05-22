const {Movie} = require("../models");

const create = async (data) => {
    const newMovie = await Movie.create(data);
    return newMovie;
  };
  

const getAll = async () => {
  return await Movie.findAll();
};

const getById = async (id) => {
  return await Movie.findByPk(id);
};

const update = async (id, data) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;
  await movie.update(data);
  return movie;
};

const remove = async (id) => {
  const movie = await Movie.findByPk(id);
  if (!movie) return null;
  await movie.destroy();
  return true;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
