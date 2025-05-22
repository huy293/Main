// server.js
const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db"); // Kết nối đến cơ sở dữ liệu

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movie.routes");
const userRoutes = require("./routes/user.routes");
const genreRoutes = require("./routes/genre.routes");
const peopleRoutes = require("./routes/people1.routes");
const ratingRoutes = require("./routes/rating.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const commentRoutes = require("./routes/comment.routes");
const watchHistoryRoutes = require("./routes/watch_history.routes");
const movieGenreRoutes = require("./routes/movie_genre.routes");
const movieCastRoutes = require("./routes/movieCast.routes");
const movieCrewRoutes = require("./routes/movieCrew.routes");
const seasonRoutes = require("./routes/season.routes");
const episodeRoutes = require("./routes/episode.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/genre", genreRoutes);
app.use("/api/people", peopleRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/watch-history", watchHistoryRoutes);
app.use("/api/movie-genre", movieGenreRoutes);
app.use("/api/movie-cast", movieCastRoutes);
app.use("/api/movie-crew", movieCrewRoutes);
app.use("/api/season", seasonRoutes);
app.use("/api/episode", episodeRoutes);


app.get("/", (req, res) => res.send("Server is running..."));
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
