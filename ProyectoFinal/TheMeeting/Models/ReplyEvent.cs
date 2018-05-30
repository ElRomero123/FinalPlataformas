using M = TheMeeting.Models;
namespace TheMeeting.Models
{
    public class ReplyEvent
    {
        public M.Event[] Events { get; set; }
        public int NumberEvents { get; set; }
    }
}