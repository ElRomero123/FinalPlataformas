using System.Linq;
using System.Web.Http;
using M = TheMeeting.Models;
using O = TheMeeting.ORM;

namespace TheMeeting.Controllers
{
    public class EventUserTwoController : ApiController
    {
        private O.DBMeetingEntities dataBase = new O.DBMeetingEntities();

        public M.InfoRepliesEventUser Get(int id)
        {
            M.InfoRepliesEventUser reply = new M.InfoRepliesEventUser();

            var result = from eu in dataBase.EventUsers
                         where (eu.IdUserInvited == id)
                         select new { eu.Id, eu.IdEvent };

            M.ReplyEventUser[] replies = new M.ReplyEventUser[result.ToArray().Length];

            int i = 0;
            foreach (var item in result)
            {
                M.ReplyEventUser temp = new M.ReplyEventUser
                {
                    Id = item.Id
                };

                var idEvent = item.IdEvent;

                var result2 = from e in dataBase.Events
                              where (e.Id == idEvent)
                              select new { e.IdUser, e.Name, e.Description, e.DateCreation, e.Date, e.Place, e.IsPublic };



                var meeting = result2.ToArray()[0];

                if (meeting.IsPublic == 1)
                {
                    temp.Title = meeting.Name;
                    temp.Description = meeting.Description;
                    temp.DateCreation = meeting.DateCreation;
                    temp.DateEvent = meeting.Date;
                    temp.Place = meeting.Place;

                    var result3 = from u in dataBase.Users
                                  where (u.Id == meeting.IdUser)
                                  select new { u.Username };

                    var user = result3.ToArray()[0];
                    temp.Creator = user.Username;

                    replies[i] = temp;
                    i++;
                }
            }

            reply.Replies = replies;
            reply.SizeReplies = replies.Length;
            return reply;
        }
    }
}