using System.Linq;
using System.Web.Http;
using O = TheMeeting.ORM;
using M = TheMeeting.Models;

namespace TheMeeting.Controllers
{
    public class ConfirmedUsersController : ApiController
    {
        private O.DBMeetingEntities dataBase = new O.DBMeetingEntities();
        public M.ReplyActiveUsers Get(int id)
        {
            var query1 = from e in dataBase.EventUsers
                         where (e.IdEvent == id)
                         select new { e.Id, e.IdUserInvited, e.IsAcepted, e.User.Username, e.User.Name, e.User.LastName, e.User.Sex, e.User.Phone, e.User.Email};

            M.ActiveUser[] users = new M.ActiveUser [query1.ToArray().Length];

            int i = 0;
            foreach (var item in query1)
            {
                M.ActiveUser user = new M.ActiveUser
                {
                    Id = item.Id,
                    IdUserInvited = item.IdUserInvited,
                    IsAcepted = item.IsAcepted,
                    Name = item.Name,
                    LastName = item.LastName,
                    Sex = item.Sex,
                    Phone = item.Phone,
                    Email = item.Email,
                    Username = item.Username
                };

                users[i] = user;
                i++;
            }      
        

            return new M.ReplyActiveUsers
            {
                Users = users,
                SizeUsers = users.Length        
            };
        }
    }
}