namespace TheMeeting.Models
{
    public class Event
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long IdUser { get; set; }
        public bool Public { get; set; }
    }
}