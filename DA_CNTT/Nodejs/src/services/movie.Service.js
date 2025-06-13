const {Movie, Genre, Season, Episode} = require("../models");

const create = async (data) => {
    const newMovie = await Movie.create(data);
    return newMovie;
  };
  

const getAll = async () => {
  return await Movie.findAll({
    include: [
      {
        model: Season,
        attributes: ['id']  // Chỉ lấy id để đếm số lượng
      },
      {
        model: Genre,
        through: { attributes: [] },
        attributes: ['name']
      }
    ]
  });
};

const getById = async (id) => {
  return await Movie.findByPk(id, {
    include: [
      {
        model: Genre,
        through: { attributes: [] }
      },
      {
        model: Season,
        include: [Episode]
      }
    ]
  });
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

const GetAllWithGenres = async () => {
  return await Movie.findAll({
    include: [{
      model: Genre,
      through: { attributes: [] } // Không lấy thông tin từ bảng trung gian
    }]
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  GetAllWithGenres,
};
