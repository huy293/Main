using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebApplicationCK.Migrations;
using WebApplicationCK.Models;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApplicationCK.Controllers
{
    public class HomeController : Controller
    {
        private readonly WebXPDbContext _context;
        public HomeController(WebXPDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult login(User user)
        {
            bool isPasswordMatch = _context.Users.Any(u => u.Username == user.Username && u.Password == user.Password);

            if (isPasswordMatch)
            {
                var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
                HttpContext.Session.SetString("Userid", data.UserId.ToString());
                HttpContext.Session.SetString("Username", data.Username);
                HttpContext.Session.SetString("Userstatus", data.Status);
                return RedirectToAction("Main");
            }

            string error = "Wrong Username or Password";
            return RedirectToAction("Main", new { error = error });
        }
        public IActionResult loginl(User user)
        {
            bool isPasswordMatch = _context.Users.Any(u => u.Username == user.Username && u.Password == user.Password);

            if (isPasswordMatch)
            {
                var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
                HttpContext.Session.SetString("Userid", data.UserId.ToString());
                HttpContext.Session.SetString("Username", data.Username);
                HttpContext.Session.SetString("Userstatus", data.Status);
                return RedirectToAction("Main");
            }

            string error = "Wrong Username or Password";
            return RedirectToAction("loc", new { error = error });
        }
        public IActionResult logini(User user, int id)
        {
            bool isPasswordMatch = _context.Users.Any(u => u.Username == user.Username && u.Password == user.Password);

            if (isPasswordMatch)
            {
                var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
                HttpContext.Session.SetString("Userid", data.UserId.ToString());
                HttpContext.Session.SetString("Username", data.Username);
                HttpContext.Session.SetString("Userstatus", data.Status);
                return RedirectToAction("Inf", new { id = id });
            }

            string error = "Wrong Username or Password";
            return RedirectToAction("Inf", new { id = id, error = error });
        }
        public IActionResult loginf(User user, int id)
        {
            bool isPasswordMatch = _context.Users.Any(u => u.Username == user.Username && u.Password == user.Password);

            if (isPasswordMatch)
            {
                var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
                HttpContext.Session.SetString("Userid", data.UserId.ToString());
                HttpContext.Session.SetString("Username", data.Username);
                HttpContext.Session.SetString("Userstatus", data.Status);
                return RedirectToAction("film", new { id = id});
            }

            string error = "Wrong Username or Password";
            return RedirectToAction("film", new { id = id, error = error });
        }
        [HttpPost]
        public IActionResult createacc(User user, string check)
        {
            bool isUsernameExists = _context.Users.Any(u => u.Username == user.Username);
            bool isEmailExists = _context.Users.Any(u => u.Email == user.Email);

            if (isUsernameExists || isEmailExists)
            {
                string error = "Username or email already exists.";
                return RedirectToAction("Main", new { error = error });
            }
            var newData = new User
            {
                Username = user.Username,
                Password = user.Password,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Status = "user"
            };

            if (newData.Password == check)
            {
                _context.Users.Add(newData);
                _context.SaveChanges();
            }
            else
            {
                string error = "Wrong Confirm Your Password";
                return RedirectToAction("Main", new { error = error });
            }
            var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
            HttpContext.Session.SetString("Userid", data.UserId.ToString());
            HttpContext.Session.SetString("Username", data.Username);
            HttpContext.Session.SetString("Userstatus", data.Status);
            return RedirectToAction("Main");
        }
        [HttpPost]
        public IActionResult createaccl(User user, string check)
        {
            bool isUsernameExists = _context.Users.Any(u => u.Username == user.Username);
            bool isEmailExists = _context.Users.Any(u => u.Email == user.Email);

            if (isUsernameExists || isEmailExists)
            {
                string error = "Username or email already exists.";
                return RedirectToAction("loc", new { error = error });
            }
            var newData = new User
            {
                Username = user.Username,
                Password = user.Password,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Status = "user"
            };

            if (newData.Password == check)
            {
                _context.Users.Add(newData);
                _context.SaveChanges();
            }
            else
            {
                string error = "Wrong Confirm Your Password";
                return RedirectToAction("loc", new { error = error });
            }
            var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
            HttpContext.Session.SetString("Userid", data.UserId.ToString());
            HttpContext.Session.SetString("Username", data.Username);
            HttpContext.Session.SetString("Userstatus", data.Status);
            return RedirectToAction("loc");
        }
        [HttpPost]
        public IActionResult createacci(User user, string check ,int id)
        {
            bool isUsernameExists = _context.Users.Any(u => u.Username == user.Username);
            bool isEmailExists = _context.Users.Any(u => u.Email == user.Email);

            if (isUsernameExists || isEmailExists)
            {
                string error = "Username or email already exists.";
                return RedirectToAction("Inf", new { id = id, error = error });
            }
            var newData = new User
            {
                Username = user.Username,
                Password = user.Password,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Status = "user"
            };

            if (newData.Password == check)
            {
                _context.Users.Add(newData);
                _context.SaveChanges();
            }
            else
            {
                string error = "Wrong Confirm Your Password";
                return RedirectToAction("Inf", new { id = id, error = error });
            }
            var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
            HttpContext.Session.SetString("Userid", data.UserId.ToString());
            HttpContext.Session.SetString("Username", data.Username);
            HttpContext.Session.SetString("Userstatus", data.Status);
            return RedirectToAction("Inf", new { id = id });
        }
        [HttpPost]
        public IActionResult createaccf(User user, string check, int id)
        {
            bool isUsernameExists = _context.Users.Any(u => u.Username == user.Username);
            bool isEmailExists = _context.Users.Any(u => u.Email == user.Email);

            if (isUsernameExists || isEmailExists)
            {
                string error = "Username or email already exists.";
                return RedirectToAction("film", new { id = id, error = error });
            }
            var newData = new User
            {
                Username = user.Username,
                Password = user.Password,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Status = "user"
            };

            if (newData.Password == check)
            {
                _context.Users.Add(newData);
                _context.SaveChanges();
            }
            else
            {
                string error = "Wrong Confirm Your Password";
                return RedirectToAction("film", new { id = id, error = error });
            }
            var data = _context.Users.FirstOrDefault(u => u.Username == user.Username);
            HttpContext.Session.SetString("Userid", data.UserId.ToString());
            HttpContext.Session.SetString("Username", data.Username);
            HttpContext.Session.SetString("Userstatus", data.Status);
            return RedirectToAction("film", new { id = id });
        }











        public IActionResult Main(string? error)
        {
            if (!string.IsNullOrEmpty(error))
            {
                ViewBag.ErrorMessage = error;
            }
            var movies = _context.Movies.ToList();

            // Sắp xếp danh sách theo ID giảm dần
            ViewBag.movies = movies.OrderByDescending(m => m.MovieId).ToList();
            ViewBag.moviestt = movies
                .OrderByDescending(m => m.MovieId)
                .Take(9)
                .ToList();

            List<Movie> movieshh = movies
                .Where(m => m.Genre.Split(',').Any(g => string.Equals(g.Trim(), "Hoạt Hình", StringComparison.OrdinalIgnoreCase)))
                .OrderByDescending(m => m.MovieId)
                .Take(8)
                .ToList();

            ViewBag.movieshh = movieshh;
            ViewBag.moviesrt = movies
                .OrderByDescending(m => m.Rating)
                .Take(8)
                .ToList();


            List<Movie> moviesttv = movies
                .OrderByDescending(m => m.TotalView)
                .Take(6)
                .ToList();
            List<Episode> episodes = _context.Episodes.ToList();

            Dictionary<Movie, int> movieEpisodeCounts = new Dictionary<Movie, int>();
            foreach (var movie in moviesttv)
            {
                int count = episodes.Count(e => e.MovieId == movie.MovieId);
                movieEpisodeCounts.Add(movie, count); // Lưu trữ thông tin đếm vào Dictionary
            }

            ViewBag.moviesttv = movieEpisodeCounts;
            return View();
        }
        [HttpGet]
        public IActionResult loc(string? genre, string? type, int? year, string? error)
        {
            if (!string.IsNullOrEmpty(error))
            {
                ViewBag.ErrorMessage = error;
            }
            var movies = _context.Movies.ToList();
            List<Movie> moviesttv = movies
                .OrderByDescending(m => m.TotalView)
                .Take(6)
                .ToList();
            List<Episode> episodes = _context.Episodes.ToList();

            Dictionary<Movie, int> movieEpisodeCounts = new Dictionary<Movie, int>();
            foreach (var movie in moviesttv)
            {
                int count = episodes.Count(e => e.MovieId == movie.MovieId);
                movieEpisodeCounts.Add(movie, count); // Lưu trữ thông tin đếm vào Dictionary
            }
            ViewBag.moviesttv = movieEpisodeCounts;

            var search = _context.Movies.ToList();
            if (!string.IsNullOrEmpty(genre))
            {
                search = search.Where(m => m.Genre.Contains(genre)).ToList();
            }
            if (!string.IsNullOrEmpty(type))
            {
                string str1 = "new";
                string str2 = "le";
                string str3 = "bo";
                string str4 = "view";
                if (string.Equals(type, str1, StringComparison.OrdinalIgnoreCase))
                {
                    search = search
                        .Where(m => m.ReleaseDate.Contains("2023"))
                        .OrderByDescending(m => m.MovieId)
                        .ToList();
                }
                if (string.Equals(type, str2, StringComparison.OrdinalIgnoreCase))
                {
                    search = search
                        .Where(m => m.TotalEpisode == 1)
                        .OrderByDescending(m => m.MovieId)
                        .ToList();
                }
                if (string.Equals(type, str3, StringComparison.OrdinalIgnoreCase))
                {
                    search = search
                        .Where(m => m.TotalEpisode > 1)
                        .OrderByDescending(m => m.MovieId)
                        .ToList();
                }
                if (string.Equals(type, str4, StringComparison.OrdinalIgnoreCase))
                {
                    search = search
                        .OrderByDescending(m => m.TotalView)
                        .ToList();
                }
            }
            if (year.HasValue)
            {
                search = search.Where(m => m.ReleaseDate.Contains(year.Value.ToString())).ToList();
                
            }
            ViewBag.search = search;
            return View();
        }
        [HttpPost]
        public ActionResult loc(string searchfilm)
        {
            var movies = _context.Movies.ToList();
            List<Movie> moviesttv = movies
                .OrderByDescending(m => m.TotalView)
                .Take(6)
                .ToList();
            List<Episode> episodes = _context.Episodes.ToList();

            Dictionary<Movie, int> movieEpisodeCounts = new Dictionary<Movie, int>();
            foreach (var movie in moviesttv)
            {
                int count = episodes.Count(e => e.MovieId == movie.MovieId);
                movieEpisodeCounts.Add(movie, count); // Lưu trữ thông tin đếm vào Dictionary
            }
            ViewBag.moviesttv = movieEpisodeCounts;

            var listfilm = from b in _context.Movies select b;
            if (!string.IsNullOrEmpty(searchfilm))
            {
                listfilm = listfilm.Where(x => x.Title.Contains(searchfilm));
            }
            ViewBag.search = listfilm.ToList();
            return View();
        }
        [HttpGet]
        public IActionResult Inf(int id, string? error)
        {
            if (!string.IsNullOrEmpty(error))
            {
                ViewBag.ErrorMessage = error;
            }
            var movies = _context.Movies.ToList();
            List<Movie> moviesttv = movies
                .OrderByDescending(m => m.TotalView)
                .Take(6)
                .ToList();
            List<Episode> episodes = _context.Episodes.ToList();

            Dictionary<Movie, int> movieEpisodeCounts = new Dictionary<Movie, int>();
            foreach (var movie in moviesttv)
            {
                int count = episodes.Count(e => e.MovieId == movie.MovieId);
                movieEpisodeCounts.Add(movie, count); // Lưu trữ thông tin đếm vào Dictionary
            }

            ViewBag.moviesttv = movieEpisodeCounts;
            ViewBag.moviestt = movies
                .OrderByDescending(m => m.MovieId)
                .Take(9)
                .ToList();
            var movieid = _context.Movies.Find(id);
            ViewBag.movieinf = movieid;


            var listep = from c in _context.Episodes select c;
            listep = listep.Where(x => x.MovieId == id);
            var listep1 = listep
                .Where(x => x.MovieId == id)
                .Take(1);
            ViewBag.ListEp = listep.ToList();
            ViewBag.ListEp1 = listep1.ToList();
            return View();
        }
        [HttpGet]
        public IActionResult film(int id, string? error)
        {
            
            if (!string.IsNullOrEmpty(error))
            {
                ViewBag.ErrorMessage = error;
            }
            var movies = _context.Movies.ToList();
            List<Movie> moviesttv = movies
                .OrderByDescending(m => m.TotalView)
                .Take(6)
                .ToList();
            List<Episode> episodes = _context.Episodes.ToList();

            Dictionary<Movie, int> movieEpisodeCounts = new Dictionary<Movie, int>();
            foreach (var movie in moviesttv)
            {
                int count = episodes.Count(e => e.MovieId == movie.MovieId);
                movieEpisodeCounts.Add(movie, count); // Lưu trữ thông tin đếm vào Dictionary
            }

            ViewBag.moviesttv = movieEpisodeCounts;
            ViewBag.moviestt = movies
                .OrderByDescending(m => m.MovieId)
                .Take(9)
                .ToList();

            
            var filmid = _context.Episodes.Find(id);
            ViewBag.film = filmid;

            if (filmid != null)
            {
                filmid.View++;
                _context.SaveChanges();
                var idfilm = filmid.MovieId;

                var listep = _context.Episodes.Where(x => x.MovieId == idfilm).ToList();
                ViewBag.ListEp = listep;
            }
            string id1 = HttpContext.Session.GetString("Userid");
            if (id1 != null && filmid != null)
            {
                int id2 = int.Parse(id1);
                var idfilm = filmid.MovieId;
                var data = new WatchHistory
                {
                    MovieId = idfilm,
                    UserId = id2
                };
                _context.WatchHistories.Add(data);
                _context.SaveChanges();
            }
            return View();
        }
        [HttpPost]
        public IActionResult save(int id)
        {
            string id1 = HttpContext.Session.GetString("Userid");
            if (!string.IsNullOrEmpty(id1) && id != 0)
            {
                int id2 = int.Parse(id1);

                // Kiểm tra xem bản ghi đã tồn tại hay chưa
                bool isDuplicate = _context.Favorites.Any(f => f.MovieId == id && f.UserId == id2);

                if (!isDuplicate)
                {
                    var data = new Favorite
                    {
                        MovieId = id,
                        UserId = id2
                    };
                    _context.Favorites.Add(data);
                    _context.SaveChanges();
                }
            }
            return RedirectToAction("Inf", new { id = id });
        }
        [HttpPost]
        public IActionResult changepw(User user)
        {
            var listu = _context.Users.ToList();

            // Kiểm tra xem Username và Email có đúng hay không
            var userToUpdate = listu.FirstOrDefault(u => u.Username == user.Username && u.Email == user.Email);
            if (userToUpdate != null)
            {
                userToUpdate.Password = user.Password;
                _context.SaveChanges();

                return RedirectToAction("Main");
            }
            else
            {
                ViewBag.ErrorMessage = "Wrong Username or Email";
                return View();
            }
        }
        [HttpGet]
        public IActionResult Logout() {
            HttpContext.Session.Clear();
            return RedirectToAction("Main");
        }
    }
}
