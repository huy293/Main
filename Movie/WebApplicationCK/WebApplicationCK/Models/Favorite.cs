﻿namespace WebApplicationCK.Models
{
    public class Favorite
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }

        // Navigation properties
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
