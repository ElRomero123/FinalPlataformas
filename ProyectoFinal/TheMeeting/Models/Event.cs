namespace TheMeeting.Models
{
    public class Event
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int IdUser { get; set; }
        public int IsPublic { get; set; }
    }
}