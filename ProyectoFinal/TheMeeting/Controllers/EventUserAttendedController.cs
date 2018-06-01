using System.Web.Http;
using M = TheMeeting.Models;
using O = TheMeeting.ORM;
using System.Linq;

namespace TheMeeting.Controllers
{
    public class EventUserAttendedController : ApiController
    {
        private O.DBMeetingEntities dataBase = new O.DBMeetingEntities();
        public M.EntityReplyUserAttended Get(int id)
        {
            var query1 = from e in dataBase.Events
                         where (e.IdUser == id)
                         select new {e.Id, e.Name, e.Description, e.Place, e.Date, e.DateCreation};

            M.EntityReplyUserAttended reply = new M.EntityReplyUserAttended();
            M.ReplyEventUserAttended[] events = new M.ReplyEventUserAttended[query1.ToArray().Length];

            int j = 0;
            foreach (var evento in query1)
            {
                string[] infoEvent = {evento.Name, evento.Description, evento.Place, evento.Date, evento.DateCreation};

                var query2 = from eu in dataBase.EventUsers
                             where (eu.IdEvent == evento.Id)
                             select new {eu.IdUserInvited, eu.Id, eu.IsAcepted};

                int size = query2.ToArray().Length;

                string[,] users = new string [size,7];

                reply.UsersPerEvent[j] = size;

                int i = 0;
                foreach (var user in query2)
                {
                    if(user.IsAcepted == 1)
                    {
                        var query3 = from u in dataBase.Users
                                     where (u.Id == user.IdUserInvited)
                                     select new { u.Username, u.Name, u.LastName, u.Sex, u.Phone, u.Email };

                        var result3 = query3.ToArray()[0];

                        users[i, 0] = user.Id.ToString();
                        users[i, 1] = result3.Username;
                        users[i, 2] = result3.Name;
                        users[i, 3] = result3.LastName;
                        users[i, 4] = result3.Sex.ToString();
                        users[i, 5] = result3.Phone;
                        users[i, 6] = result3.Email;

                        i++;
                    }    
                }

                M.ReplyEventUserAttended temp = new M.ReplyEventUserAttended
                {

                    InfoEvent = infoEvent,
                    Users = users
                };

                events[j] = temp;
                j++;
            }

            reply.SizeEvents = events.Length;
            reply.Events = events;

            return reply;
        }
    }
}