const { Genre } = require('../models');

exports.GetAll = async () => {
  return await Genre.findAll();
};

exports.GetById = async (id) => {
  return await Genre.findByPk(id);
};

exports.Create = async (name) => {
  return await Genre.create({ name });
};

exports.Update = async (id, name) => {
  const genre = await Genre.findByPk(id);
  if (!genre) {
    throw new Error('Genre not found');
  }
  genre.name = name;
  return await genre.save();
};

exports.Delete = async (id) => {
  const genre = await Genre.findByPk(id);
  if (!genre) {
    throw new Error('Genre not found');
  }
  return await genre.destroy();
};
