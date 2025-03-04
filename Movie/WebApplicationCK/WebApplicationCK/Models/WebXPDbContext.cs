using Microsoft.EntityFrameworkCore;
namespace WebApplicationCK.Models
{
    public class WebXPDbContext : DbContext
    {

        public WebXPDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<WatchHistory> WatchHistories { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<ActionMovie> ActionMovies { get; set; }
        public DbSet<Episode> Episodes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Định nghĩa các quan hệ và các khóa chính khác
            modelBuilder.Entity<Movie>()
                .HasIndex(m => m.Title)
                .IsUnique();
            modelBuilder.Entity<WatchHistory>()
                .HasKey(w => new { w.UserId, w.MovieId });

            modelBuilder.Entity<Review>()
                .HasKey(r => new { r.ReviewId, r.UserId, r.MovieId });

            modelBuilder.Entity<Favorite>()
                .HasKey(f => new { f.UserId, f.MovieId });

            modelBuilder.Entity<ActionMovie>()
                .HasKey(am => new { am.MovieId, am.ActorId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
