using M = TheMeeting.Models;
namespace TheMeeting.Models
{
    public class InfoRepliesEventUser
    {
        public M.ReplyEventUser[] Replies { get; set; }
        public int SizeReplies { get; set; }
    }
}