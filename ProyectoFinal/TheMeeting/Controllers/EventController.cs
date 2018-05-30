using System;
using System.Collections.Generic;
using System.Web.Http;
using M = TheMeeting.Models;
using O = TheMeeting.ORM;
using System.Linq;

namespace TheMeeting.Controllers
{
    public class EventController : ApiController
    {
        private O.DBMeetingEntities dataBase = new O.DBMeetingEntities();

        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public M.ReplyEvent Get(int id)
        {
            var result = from e in dataBase.Events
                         where (e.IdUser == id)
                         select new {e.Id, e.Name, e.Description, e.IsPublic, e.Date, e.Place, e.DateCreation};

            var items = result.ToArray();

            M.Event[] eventos = new M.Event[items.Length];

            for(int i = 0; i < items.Length; i++)
            {
                var item = items[i];

                eventos[i] = new M.Event
                {
                    Id           = item.Id,
                    Name         = item.Name,
                    Description  = item.Description,
                    IsPublic     = item.IsPublic,
                    Date         = item.Date,
                    Place        = item.Place,
                    DateCreation = item.DateCreation
                };
            }

            M.ReplyEvent reply = new M.ReplyEvent
            {
                Events       = eventos,
                NumberEvents = eventos.Length
            };

            return reply;
        }

        public M.Reply Post(M.Event meeting)
        {
            M.Reply reply = new M.Reply
            {
                Status = false
            };

            meeting.DateCreation = DateTime.Now.ToString();

            try
            {
                #pragma warning disable CS0618 // El tipo o el miembro están obsoletos
                AutoMapper.Mapper.CreateMap<M.Event, O.Event>();
                #pragma warning restore CS0618 // El tipo o el miembro están obsoletos
                O.Event objectEvent = AutoMapper.Mapper.Map<O.Event>(meeting);
                dataBase.Events.Add(objectEvent);
                dataBase.SaveChanges();
                reply.Status = true;
            }

            catch (Exception ex)
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
 