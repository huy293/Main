using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace WebApplicationCK.Models

{
    public class Movie
    {
        public int MovieId { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Title { get; set; }
        public string Description { get; set; }

        [Required(ErrorMessage = "Genre is required.")]
        public string Genre { get; set; }

        [Required(ErrorMessage = "Total Ep is required.")]
        public int TotalEpisode { get; set; }
        public string Director { get; set; }

        [Required(ErrorMessage = "Poster is required.")]
        public string Poster { get; set; }

        [Required(ErrorMessage = "Trailer Ep is required.")]
        public string Trailer { get; set; }
        public string Nation { get; set; }
        public string ReleaseDate { get; set; }
        public float Rating { get; set; }
        public int? TotalView { get; set; }

        // Navigation properties
        public List<WatchHistory> WatchHistories { get; set; }
        public List<Review> Reviews { get; set; }
        public List<Favorite> Favorites { get; set; }
        public List<ActionMovie> ActionMovies { get; set; }
        public List<Episode> Episodes { get; set; }
    }
    public class MovieViewModel
    {
        public Movie Movie { get; set; }
        public List<Movie> MovieList { get; set; }
    }
}
