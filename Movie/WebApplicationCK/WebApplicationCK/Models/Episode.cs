using System.ComponentModel.DataAnnotations;
namespace WebApplicationCK.Models
{
    public class Episode
    {
        public int EpisodeId { get; set; }

        [Required(ErrorMessage = "Name Ep is required.")]
        public string EpisodeName { get; set; }

        [Required(ErrorMessage = "Video is required.")]
        public string EpisodeFilm { get; set; }
        public int Duration { get; set; }
        public int View { get; set; }

        [Required(ErrorMessage = "ID Film is required.")]
        public int MovieId { get; set; }

        // Navigation properties
        public Movie Movie { get; set; }
    }
}
