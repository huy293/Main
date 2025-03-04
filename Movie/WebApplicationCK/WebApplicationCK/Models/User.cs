using System.ComponentModel.DataAnnotations;
namespace WebApplicationCK.Models
{
    public class User
    {
        public int UserId { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; }
        public string? Avatar { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "FirstName is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "LastName is required.")]
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string Status { get; set; }

        // Navigation properties
        public List<WatchHistory> WatchHistories { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Favorite> Favorites { get; set; }
    }
}
