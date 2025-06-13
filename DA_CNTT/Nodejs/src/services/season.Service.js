const { Season, Episode, Movie, MovieGenre, Genre } = require("../models");
const { Op } = require("sequelize");

exports.createSeason = async (movieId, data) => {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      throw new Error("Movie not found");
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

exports.getTrendingSeasons = async () => {
  const seasons = await Season.findAll({
    include: [{
      model: Movie,
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }],
    order: [['viewCount', 'DESC']],
    limit: 20
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

exports.getPopularSeasons = async () => {
  const seasons = await Season.findAll({
    include: [{
      model: Movie,
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }],
    order: [['viewCount', 'DESC']],
    limit: 20
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

exports.getTopRatedSeasons = async () => {
  const seasons = await Season.findAll({
    include: [{
      model: Movie,
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }],
    order: [['rating', 'DESC']],
    limit: 20
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

exports.getUpcomingSeasons = async () => {
  const currentDate = new Date();
  const seasons = await Season.findAll({
    where: {
      release_date: {
        [Op.gt]: currentDate
      }
    },
    include: [{
      model: Movie,
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }],
    order: [['release_date', 'ASC']],
    limit: 20
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

exports.getNowPlayingSeasons = async () => {
  const currentDate = new Date();
  const thirtyDaysAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
  const seasons = await Season.findAll({
    where: {
      release_date: {
        [Op.between]: [thirtyDaysAgo, currentDate]
      }
    },
    include: [{
      model: Movie,
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }],
    order: [['release_date', 'DESC']],
    limit: 20
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

exports.getSeasonsByGenre = async (genreName) => {
  const seasons = await Season.findAll({
    include: [{
      model: Movie,
      attributes: ['title'],
      include: [{
        model: Genre,
        through: { model: MovieGenre },
        where: { name: genreName }, // Lấy theo tên
        attributes: ['name']
      }]
    }],
    limit: 20
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: season.Movie ? `${season.Movie.title} - ${season.title}` : season.title,
    genres: season.Movie && season.Movie.Genres
      ? season.Movie.Genres.map(genre => genre.name)
      : []
  }));
};

exports.searchSeasons = async (query) => {
  const seasons = await Season.findAll({
    include: [{
      model: Movie,
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }]
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

exports.getSeasonsByType = async (type) => {
  const seasons = await Season.findAll({
    include: [{
      model: Movie,
      where: { type },
      attributes: ['title'],
      include: [{
        model: MovieGenre,
        include: [{
          model: Genre,
          attributes: ['name']
        }]
      }]
    }]
  });

  return seasons.map(season => ({
    ...season.toJSON(),
    fullTitle: `${season.Movie.title} - ${season.title}`,
    genres: season.Movie.MovieGenres.map(mg => mg.Genre.name)
  }));
};

