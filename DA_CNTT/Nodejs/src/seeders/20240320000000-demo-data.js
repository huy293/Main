'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm thể loại phim
    await queryInterface.bulkInsert('Genres', [
      { name: 'Hành Động' },
      { name: 'Hài' },
      { name: 'Tâm Lý' },
      { name: 'Kinh Dị' },
      { name: 'Tình Cảm' },
      { name: 'Khoa Học Viễn Tưởng' },
      { name: 'Tài Liệu' },
      { name: 'Hoạt Hình' },
      { name: 'Phiêu Lưu' },
      { name: 'Hình Sự' }
    ]);

    // Lấy tất cả genres đã thêm
    const genres = await queryInterface.sequelize.query(
      'SELECT * FROM Genres;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Thêm phim
    await queryInterface.bulkInsert('Movies', [
      {
        title: 'Avengers: Endgame',
        type: 'movie'
      },
      {
        title: 'Stranger Things',
        type: 'series'
      },
      {
        title: 'The Dark Knight',
        type: 'movie'
      },
      {
        title: 'Breaking Bad',
        type: 'series'
      },
      {
        title: 'Inception',
        type: 'movie'
      },
      {
        title: 'Game of Thrones',
        type: 'series'
      },
      {
        title: 'The Matrix',
        type: 'movie'
      },
      {
        title: 'Friends',
        type: 'series'
      },
      {
        title: 'Interstellar',
        type: 'movie'
      },
      {
        title: 'The Walking Dead',
        type: 'series'
      }
    ]);

    // Lấy tất cả movies đã thêm
    const movies = await queryInterface.sequelize.query(
      'SELECT * FROM Movies;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Thêm liên kết phim-thể loại
    const movieGenres = [];
    movies.forEach((movie, index) => {
      // Mỗi phim có 2-3 thể loại
      const genreCount = Math.floor(Math.random() * 2) + 2;
      const genreIndices = new Set();
      while(genreIndices.size < genreCount) {
        genreIndices.add(Math.floor(Math.random() * genres.length));
      }
      genreIndices.forEach(genreIndex => {
        movieGenres.push({
          movieId: movie.id,
          genreId: genres[genreIndex].id
        });
      });
    });
    await queryInterface.bulkInsert('MovieGenres', movieGenres);

    // Thêm seasons cho phim series
    const seasons = [];
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
    const thirtyDaysLater = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000));

    movies.forEach(movie => {
      if (movie.type === 'series') {
        // Mỗi series có 2-5 seasons
        const seasonCount = Math.floor(Math.random() * 4) + 2;
        for (let i = 1; i <= seasonCount; i++) {
          // Tạo ngày phát sóng ngẫu nhiên
          let releaseDate;
          let status;
          
          if (i === 1) {
            // Season đầu tiên là completed
            releaseDate = new Date(thirtyDaysAgo.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
            status = 'completed';
          } else if (i === 2) {
            // Season thứ hai là now playing
            releaseDate = new Date(thirtyDaysAgo.getTime() + (Math.random() * 30 * 24 * 60 * 60 * 1000));
            status = 'ongoing';
          } else {
            // Các season còn lại là upcoming
            releaseDate = new Date(currentDate.getTime() + (Math.random() * 60 * 24 * 60 * 60 * 1000));
            status = 'upcoming';
          }

          seasons.push({
            movieId: movie.id,
            season_number: i,
            title: `Season ${i}`,
            overview: `Mùa ${i} của ${movie.title}`,
            release_date: releaseDate,
            poster_url: `https://picsum.photos/1080/1620`,
            backdrop_url: `https://picsum.photos/1920/1080`,
            trailer_url: `https://www.youtube.com/watch?v=2VI4br_L_Ec`,
            status: status,
            runtime: Math.floor(Math.random() * 30) + 30,
          });
        }
      } else {
        // Phim lẻ có 1 season
        seasons.push({
          movieId: movie.id,
          season_number: 1,
          title: movie.title,
          overview: `Phim ${movie.title}`,
          release_date: new Date(2020 + Math.floor(Math.random() * 5), 0, 1),
          poster_url: `https://picsum.photos/1080/1620`,
          backdrop_url: `https://picsum.photos/1920/1080`,
          trailer_url: `https://www.youtube.com/watch?v=2VI4br_L_Ec`,
          status: 'completed',
          runtime: Math.floor(Math.random() * 30) + 90
        });
      }
    });
    await queryInterface.bulkInsert('Seasons', seasons);

    // Lấy tất cả seasons đã thêm
    const createdSeasons = await queryInterface.sequelize.query(
      'SELECT * FROM Seasons;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Thêm episodes cho mỗi season
    const episodes = [];
    createdSeasons.forEach(season => {
      const movie = movies.find(m => m.id === season.movieId);
      if (movie.type === 'series') {
        // Mỗi season có 8-12 episodes
        const episodeCount = Math.floor(Math.random() * 5) + 8;
        for (let i = 1; i <= episodeCount; i++) {
          episodes.push({
            seasonId: season.id,
            episode_number: i,
            title: `Tập ${i}`,
            overview: `Tập ${i} của ${movie.title} - ${season.title}`,
            runtime: Math.floor(Math.random() * 20) + 40,
            video_url: `https://example.com/videos/${season.id}_e${i}.mp4`,
            release_date: new Date(season.release_date.getTime() + i * 7 * 24 * 60 * 60 * 1000)
          });
        }
      } else {
        // Phim lẻ có 1 episode
        episodes.push({
          seasonId: season.id,
          episode_number: 1,
          title: movie.title,
          overview: `Phim ${movie.title}`,
          runtime: season.runtime,
          video_url: `https://example.com/videos/${season.id}.mp4`,
          release_date: season.release_date
        });
      }
    });
    await queryInterface.bulkInsert('Episodes', episodes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Episodes', null, {});
    await queryInterface.bulkDelete('Seasons', null, {});
    await queryInterface.bulkDelete('MovieGenres', null, {});
    await queryInterface.bulkDelete('Movies', null, {});
    await queryInterface.bulkDelete('Genres', null, {});
  }
}; 