using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using WebApplicationCK.Models;

namespace WebApplicationCK.Controllers
{
    public class InfController : Controller
    {
        private readonly WebXPDbContext _context;
        public InfController(WebXPDbContext context)
        {
            _context = context;
        }
        public ActionResult acount()
        {
            string id1 = HttpContext.Session.GetString("Userid");
            if(id1 != null)
            {
                int id = int.Parse(id1);
                var listacc = from b in _context.Users select b;
                var acc = listacc.Where(x => x.UserId == id).ToList();
                ViewBag.acc = acc;
            }
            return View();
        }
        [HttpGet]
        public ActionResult change(int id)
        {
            if (id != null)
            {
                var listacc = from b in _context.Users select b;
                var acc = listacc.Where(x => x.UserId == id).ToList();
                ViewBag.acc = acc;
            }
            return View();
        }
        [HttpPost]
        public ActionResult change(User user)
        {
            string id1 = HttpContext.Session.GetString("Userid");
            if (id1 != null)
            {
                int id = int.Parse(id1);
                var upData = _context.Users.Find(id);
                if (upData != null)
                {
                    upData.Password = user.Password;
                    upData.Email = user.Email;
                    upData.DateOfBirth = user.DateOfBirth;
                    upData.Gender = user.Gender;
                };
                if (upData.Password == null || upData.Email == null)
                {
                    // Xử lý khi ít nhất một thuộc tính trong newData là trống, ví dụ: hiển thị thông báo lỗi
                    ViewBag.ErrorMessage = "Dữ liệu phim trống.";
                }
                else
                {
                    _context.SaveChanges();
                }
            }
            return RedirectToAction("acount");
        }

        public ActionResult favourite()
        {
            string id1 = HttpContext.Session.GetString("Userid");
            if (id1 != null)
            {
                int id = int.Parse(id1);
                var search = _context.Favorites.Include(f => f.Movie).Where(f => f.UserId == id).ToList();
                if (search != null)
                {
                    var movies = search.Select(f => f.Movie).Reverse().ToList();
                    ViewBag.movie = movies;
                }
            }
            return View();
        }


        public ActionResult history()
        {
            string id1 = HttpContext.Session.GetString("Userid");
            if (id1 != null)
            {
                int id = int.Parse(id1);
                var search = _context.WatchHistories.Include(f => f.Movie).Where(f => f.UserId == id).ToList();
                if (search != null)
                {
                    var movies = search.Select(f => f.Movie).Reverse().Take(12).ToList();
                    ViewBag.movie = movies;
                }
            }
            return View();
        }

    }
}
