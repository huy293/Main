namespace WebApplicationCK.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public decimal Rating { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
