namespace TheMeeting.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int IdUser { get; set; }
        public int IsPublic { get; set; }
        public string Date { get; set; }
        public string Place { get; set; }
        public string DateCreation { get; set; }
    }
}