namespace TheMeeting.Models
{
    public class EntityReplyUserAttended
    {
        public ReplyEventUserAttended[] Events { get; set; }
        public int SizeEvents { get; set; }
        public int[] UsersPerEvent { get; set; }
    }
}