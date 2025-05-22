const { MovieGenre, Genre, Movie } = require("../models");
exports.getAllGenresOfMovies = async () => {
  try {
    const movieGenres = await MovieGenre.findAll({
      include: [
        {
          model: Movie, // Assuming Movie model exists and you want to include movie details
          attributes: ["id", "title"], // You can change this depending on the movie fields you need
        },
        {
          model: Genre,
          attributes: ["id", "name"], // Include the genre details
        },
      ],
    });
    return movieGenres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw error;
  }
};
exports.getGenresOfMovie = async (movieId) => {
  return await MovieGenre.findAll({
    where: { movieId },
    include: [{ model: Genre, attributes: ["id", "name"] }],
  });
};

exports.updateMovieGenres = async (movieId, genreIds) => {
    // Nếu genreIds là mảng rỗng, có nghĩa là gỡ hết tất cả thể loại của phim
    if (genreIds && genreIds.length === 0) {
      await MovieGenre.destroy({ where: { movieId } });
      return;
    }
  
    // Nếu genreIds có giá trị, thực hiện cập nhật
    if (genreIds) {
      // Xóa tất cả thể loại cũ của phim
      await MovieGenre.destroy({ where: { movieId } });
  
      // Thêm thể loại mới vào phim
      const newLinks = genreIds.map((genreId) => ({ movieId, genreId }));
      await MovieGenre.bulkCreate(newLinks);
    }
  };