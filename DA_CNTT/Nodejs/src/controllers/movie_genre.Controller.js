const movieGenreService = require("../services/movie_genre.Service");
const { Log } = require("../models");

exports.getAllGenres = async (req, res) => {
  try {
    const movieGenres = await movieGenreService.getAllGenresOfMovies();
    res.status(200).json(movieGenres); // Send back the data as JSON
  } catch (error) {
    console.error("Error fetching all genres of movies:", error);
    res.status(500).json({ message: "An error occurred while fetching movie genres." });
  }
};
exports.getGenresOfMovie = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const genres = await movieGenreService.getGenresOfMovie(movieId);
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

exports.updateMovieGenres = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const genreIds = req.body.genreIds;

    await movieGenreService.updateMovieGenres(movieId, genreIds);

    // Ghi log nếu là admin
    if (req.user && req.user.role === 'admin') {
      await Log.create({
        userId: req.user.id,
        action: `Admin cập nhật thể loại cho movie ${movieId}: [${genreIds.join(", ")}]`,
        time: new Date()
      });
    }

    return res.status(200).json({
      message: "Cập nhật thể loại phim thành công!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi cập nhật thể loại phim.",
    });
  }
};


