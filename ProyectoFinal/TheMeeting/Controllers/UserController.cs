using System.Web.Http;
using M = TheMeeting.Models;
using O = TheMeeting.ORM;
using System.Linq;
using System;

namespace TheMeeting.Controllers
{
    public class UserController : ApiController
    {
        private O.DBMeetingEntities dataBase = new O.DBMeetingEntities();

        public M.User Get(string username, string password)
        {
            M.User user = new M.User();

            var result =  from u in dataBase.Users
                          where (u.Username == username)
                          select new {u.Password, u.Name, u.LastName, u.Sex, u.Username, u.Phone, u.Email};

            var item = result.ToArray()[0];

            if(password == item.Password)
            {
                user.Name     = item.Name;
                user.LastName = item.LastName;
                user.Sex      = item.Sex;
                user.Username = item.Username;
                user.Phone    = item.Phone;
                user.Email    = item.Email;
            }

            return user;      
        }

        public M.Reply Post(M.User user)
        {
            M.Reply reply = new M.Reply
            {
                Status = false
            };

            try
            { 
                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.User, O.User>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.User objectUser = AutoMapper.Mapper.Map<O.User>(user);
                dataBase.Users.Add(objectUser);
                dataBase.SaveChanges();
                reply.Status = true;
            }

            catch(Exception ex)
            {
                throw ex;
            }

            return reply;
        }

        public void Put(int id, [FromBody]string value)
        {
        }

        public void Delete(int id)
        {
        }
    }
}