namespace TheMeeting.Models
{
    public class ReplyEventUser
    { 
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
        public string DateCreation { get; set; }
        public string DateEvent { get; set; }
        public string Place { get; set; }
    }
}