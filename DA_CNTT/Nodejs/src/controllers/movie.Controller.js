const movieService = require("../services/movie.Service");

exports.createMovie = async (req, res) => {
    try {
      const movie = await movieService.create(req.body);
      res.status(201).json(movie);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await movieService.getAll();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await movieService.getById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movie = await movieService.update(req.params.id, req.body);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie updated", movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const success = await movieService.remove(req.params.id);
    if (!success) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllWithGenres = async (req, res) => {
  try {
    const movies = await movieService.GetAllWithGenres();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
