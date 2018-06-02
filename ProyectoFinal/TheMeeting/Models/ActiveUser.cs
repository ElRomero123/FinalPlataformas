namespace TheMeeting.Models
{
    public class ActiveUser
    {
        public int Id { get; set; }
        public int IdUserInvited { get; set; }
        public int IsAcepted { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public int Sex { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
    }
}