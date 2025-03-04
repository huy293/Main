using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IO;
using System.Linq;
using WebApplicationCK.Models;
namespace WebApplicationCK.Controllers
{
    public class AdminController : Controller
    {

        // GET: AdminController
        private readonly WebXPDbContext _context;
        public AdminController(WebXPDbContext context)
        {
            _context = context;
        }
        public ActionResult admin()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Movie(string? searchfilm, string? genres, string? year)
        {
            var movies = _context.Movies.ToList();

            foreach (var movie in movies)
            {
                int totalView = _context.Episodes
                    .Where(e => e.MovieId == movie.MovieId)
                    .Sum(e => e.View);

                movie.TotalView = totalView;
            }

            _context.SaveChanges();

            IQueryable<Movie> query = _context.Movies;

            // Áp dụng các tiêu chí tìm kiếm
            if (!string.IsNullOrEmpty(searchfilm))
            {
                // Tìm kiếm theo tên phim
                query = query.Where(m => m.Title.Contains(searchfilm));
            }

            if (!string.IsNullOrEmpty(genres) && genres != "null")
            {
                // Tìm kiếm theo thể loại phim
                query = query.Where(m => m.Genre.Contains(genres));
            }

            if (!string.IsNullOrEmpty(year) && year != "null")
            {
                // Tìm kiếm theo năm phát hành
                query = query.Where(m => m.ReleaseDate.Contains(year));
            }

            if (string.IsNullOrEmpty(searchfilm) && string.IsNullOrEmpty(genres) && string.IsNullOrEmpty(year))
            {
                // không áp dụng bất kỳ điều kiện nào, lấy tất cả phim
                query = _context.Movies;
            }

            // Lấy danh sách phim tìm kiếm được
            List<Movie> searchResults = query.ToList();
            return View(searchResults);
        }
        [HttpPost]
        public IActionResult Movie(Movie movie) { 
            var newData = new Movie
            {
                Title = movie.Title,
                Description = movie.Description,
                Genre = movie.Genre,
                TotalEpisode = movie.TotalEpisode,
                Director = movie.Director,
                Poster = movie.Poster,
                Trailer = movie.Trailer,
                Nation  = movie.Nation,
                ReleaseDate = movie.ReleaseDate,
                Rating = movie.Rating,
                TotalView = movie.TotalView
            };
            if (newData.Title == null || newData.Description == null || newData.Genre == null || newData.TotalEpisode == 0 || newData.Director == null || newData.Poster == null || newData.Trailer == null || newData.Nation == null || newData.ReleaseDate == null || newData.Rating == 0)
            {
                // Xử lý khi ít nhất một thuộc tính trong newData là trống, ví dụ: hiển thị thông báo lỗi
                ViewBag.ErrorMessage = "Dữ liệu phim trống.";
            }
            else
            {
                _context.Movies.Add(newData);
                _context.SaveChanges();
            }
            var danhsachmovie = _context.Movies.ToList();
            return View(danhsachmovie);
        }
        public ActionResult MovieEdit(int id)
        {

            var movie = _context.Movies.Find(id);

            if (movie == null)
            {
                return NotFound();
            }
            var movieList = _context.Movies.ToList();

            var viewModel = new MovieViewModel
            {
                Movie = movie,
                MovieList = movieList
            };
            return View(viewModel);
        }
        [HttpPost]
        public IActionResult MovieEdit(Movie movie)
        {
            var upData = _context.Movies.Find(movie.MovieId);
            if(upData != null)
            {
                upData.Title = movie.Title;
                upData.Description = movie.Description;
                upData.Genre = movie.Genre;
                upData.TotalEpisode = movie.TotalEpisode;
                upData.Director = movie.Director;
                upData.Poster = movie.Poster;
                upData.Trailer = movie.Trailer;
                upData.Nation  = movie.Nation;
                upData.ReleaseDate = movie.ReleaseDate;
                upData.Rating = movie.Rating;
                upData.TotalView = movie.TotalView;
            };
            if (upData.Title == null || upData.Description == null || upData.Genre == null || upData.TotalEpisode == 0 || upData.Director == null || upData.Poster == null || upData.Trailer == null || upData.Nation == null || upData.ReleaseDate == null || upData.Rating == 0)
            {
                // Xử lý khi ít nhất một thuộc tính trong newData là trống, ví dụ: hiển thị thông báo lỗi
                ViewBag.ErrorMessage = "Dữ liệu phim trống.";
            }
            else
            {
                _context.SaveChanges();
            }
            var danhsachmovie = _context.Movies.ToList();
            return RedirectToAction("Movie");
        }
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var movie = _context.Movies.Find(id);

            if (movie == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return RedirectToAction("Movie");
        }

        [HttpGet]
        public ActionResult user(string searchacc)
        {
            var listacc = from b in _context.Users select b;
            if (!string.IsNullOrEmpty(searchacc))
            {
                listacc = listacc.Where(x => x.Username.Contains(searchacc));
            }

            ViewBag.ListAcc = listacc.ToList();
            return View();
        }
        [HttpGet]
        public ActionResult userEdit(int id)
        {
            var listacc = from b in _context.Users select b;
            ViewBag.ListAcc = listacc.ToList();
            var acc = listacc.Where(x => x.UserId == id).ToList();
            ViewBag.acc = acc;
            return View();
        }
        [HttpPost]
        public ActionResult userEdit(User user,DateTime DateOfBirth)
        {
            var upData = _context.Users.Find(user.UserId);
            DateTime dateOnly = DateOfBirth.Date;
            if (upData != null)
            {
                upData.Username = user.Username;
                upData.Password = user.Password;
                upData.Avatar = user.Avatar;
                upData.Email = user.Email;
                upData.FirstName = user.FirstName;
                upData.LastName = user.LastName;
                upData.DateOfBirth = dateOnly;
                upData.Gender = user.Gender;
                upData.Status = user.Status;
            };
            if (upData.Username == null || upData.Password == null || upData.Email == null || upData.FirstName == null || upData.LastName == null)
            {
                // Xử lý khi ít nhất một thuộc tính trong newData là trống, ví dụ: hiển thị thông báo lỗi
                ViewBag.ErrorMessage = "Dữ liệu phim trống.";
            }
            else
            {
                _context.SaveChanges();
            }

            return RedirectToAction("user");
        }
        [HttpPost]
        public IActionResult user(User user)
        {
            var newData = new User
            {
                Username = user.Username,
                Password = user.Password,
                Email = user.Email,
                Avatar = "~/img/icons8-user-96.png",
                FirstName = user.FirstName,
                LastName = user.LastName,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                Status  = user.Status
            };

            if (newData.Username == null || newData.Password == null || newData.Email == null || newData.FirstName == null || newData.LastName == null)
            {
                ViewBag.ErrorMessage = "Dữ liệu trống.";
            }
            else
            {
                _context.Users.Add(newData);
                _context.SaveChanges();
            }
            
            return RedirectToAction("user");
        }
        [HttpPost]
        public ActionResult DeleteU(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return RedirectToAction("user");
        }
        [HttpGet]
        public ActionResult Ep(string searchfilm, int? id)
        {
            var listfilm = from b in _context.Movies select b;
            if (!string.IsNullOrEmpty(searchfilm))
            {
                listfilm = listfilm.Where(x => x.Title.Contains(searchfilm));
            }

            if (id != null && id != 0)
            {
                var listep = from c in _context.Episodes select c;
                listep = listep.Where(x => x.MovieId == id);
                ViewBag.ListEp = listep.ToList();
                ViewBag.IDfilm = id;
            }

            ViewBag.ListFilm = listfilm.ToList();
            return View();
        }
        [HttpPost]
        public ActionResult Ep(Episode episode, int id)
        {
            var newData = new Episode
            {
                EpisodeName = episode.EpisodeName,
                EpisodeFilm = episode.EpisodeFilm,
                Duration = episode.Duration,
                View = episode.View,
                MovieId = id
            };
            if (newData.EpisodeName == null || newData.EpisodeFilm == null || newData.Duration == 0 || newData.View == 0 || newData.MovieId == 0)
            {
                // Xử lý khi ít nhất một thuộc tính trong newData là trống, ví dụ: hiển thị thông báo lỗi
                ViewBag.ErrorMessage = "Dữ liệu phim trống.";
            }
            else
            {
                _context.Episodes.Add(newData);
                _context.SaveChanges();
            }
            return RedirectToAction("Ep", new { id = id });
        }
        public ActionResult EpEdit(int idep, int idfilm)
        {
            var listfilm = from b in _context.Movies select b;
            ViewBag.ListFilm = listfilm.ToList();

            var listep = from c in _context.Episodes select c;
            listep = listep.Where(x => x.MovieId == idfilm);
            ViewBag.ListEp = listep.ToList();
            ViewBag.IDfilm = idfilm;
            var ep = _context.Episodes.Find(idep);
            if (ep == null)
            {
                return NotFound();
            }
            ViewBag.Ep = ep;
            return View();
        }
        [HttpPost]
        public ActionResult EpEdit(Episode episode)
        {
            var upData = _context.Episodes.Find(episode.EpisodeId);
            if (upData != null)
            {
                upData.EpisodeName = episode.EpisodeName;
                upData.EpisodeFilm = episode.EpisodeFilm;
                upData.Duration = episode.Duration;
                upData.View = episode.View;
            };
            if (upData.EpisodeName == null || upData.EpisodeFilm == null || upData.Duration == 0 || upData.View == 0)
            {
                // Xử lý khi ít nhất một thuộc tính trong newData là trống, ví dụ: hiển thị thông báo lỗi
                ViewBag.ErrorMessage = "Dữ liệu phim trống.";
            }
            else
            {
                _context.SaveChanges();
            }
            return RedirectToAction("Ep", new { id = episode.MovieId });
        }
        [HttpPost]
        public ActionResult DeleteEp(int idep, int idfilm)
        {
            var ep = _context.Episodes.Find(idep);

            if (ep == null)
            {
                return NotFound();
            }

            _context.Episodes.Remove(ep);
            _context.SaveChanges();
            return RedirectToAction("Ep", new { id = idfilm });
        }
    }
}
