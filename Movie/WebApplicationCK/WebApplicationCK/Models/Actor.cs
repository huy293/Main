namespace WebApplicationCK.Models
{
    public class Actor
    {
        public int ActorId { get; set; }
        public string Name { get; set; }

        // Navigation properties
        public List<ActionMovie> ActionMovies { get; set; }
    }
}
