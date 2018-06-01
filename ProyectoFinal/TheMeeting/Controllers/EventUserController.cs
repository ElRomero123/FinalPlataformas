using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using M = TheMeeting.Models;
using O = TheMeeting.ORM;

namespace TheMeeting.Controllers
{
    public class EventUserController : ApiController
    {
        private O.DBMeetingEntities dataBase = new O.DBMeetingEntities();

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public M.InfoRepliesEventUser Get(int id)
        {
            M.InfoRepliesEventUser reply = new M.InfoRepliesEventUser();

            var result = from eu in dataBase.EventUsers
                         where (eu.IdUserInvited == id)
                         select new {eu.Id, eu.IdEvent};

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

                if(meeting.IsPublic == 0)
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


        

        public M.Reply Post(M.ParametersEventUser parameters)
        {
            M.Reply reply = new M.Reply
            {
                Status = false
            };

            M.EventUser eventUser = new M.EventUser();

            try
            {
                var result = from u in dataBase.Users
                             where (u.Username == parameters.UsernameInvited)
                             select new {u.Id};

                var item = result.ToArray()[0];
                eventUser.IdUserInvited = item.Id;
                eventUser.IdEvent       = parameters.IdEvent;
                

                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.EventUser, O.EventUser>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.EventUser objectEventUser = AutoMapper.Mapper.Map<O.EventUser>(eventUser);
                dataBase.EventUsers.Add(objectEventUser);
                dataBase.SaveChanges();
                reply.Status = true;
            }

            catch 
            {
                reply.Status = false;
            }
            
            return reply;   
        }

        public bool Put(M.ParamsPutUserEvent parameters)
        {
            O.EventUser eventoUsuario = dataBase.EventUsers.FirstOrDefault(x => x.Id == parameters.IdUserEvent);
            eventoUsuario.IsAcepted = parameters.IsAcepted;
            dataBase.SaveChanges();
            return true;
        }

        public void Delete(int id)
        {

        }
    }
}