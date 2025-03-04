namespace WebApplicationCK.Models
{
    public class ActionMovie
    {
        public int MovieId { get; set; }
        public int ActorId { get; set; }

        // Navigation properties
        public Movie Movie { get; set; }
        public Actor Actor { get; set; }
    }
}
