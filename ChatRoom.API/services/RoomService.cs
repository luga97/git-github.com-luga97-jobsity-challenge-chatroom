using ChatRoom.API.DTOs;
using ChatRoom.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace ChatRoom.API.Services;
//TODO CREATE ABSTRACTION WITH -> IN MEMORY IMPL, DATABASE IMPL
public class RoomService(AppDbContext dbContext){

    public void CreateRoom(CreateRoomDTO dto,string username){
        var user = dbContext.Users.First(x => x.Username == username);
        var newRoom = new Room {
            RoomName = dto.Name,
            Description = dto.Description,
            Owner = user,
            Participants = [user]
        };

        dbContext.Rooms.Add(newRoom);
        dbContext.SaveChanges();
    }

    public  IEnumerable<Room> GetAllRooms(){
        return dbContext.Rooms.Include(r => r.Owner).Include(r => r.Participants);
    }

    internal IEnumerable<Message> GetRoomMessages(string roomId, int? limit)
    {
        var room = dbContext.Rooms
            .Where(r => r.Id == int.Parse(roomId))
            .FirstOrDefault() ?? throw new Exception("Room not found");
        
        IEnumerable<Message> messages = room.Messages.OrderBy(msg => msg.CreatedAt);
            if(limit.HasValue){
                messages = messages.TakeLast(limit.Value);
            }
        return messages;
    }

    internal void SaveRoomMessage(string roomId, string user, string message)
    {
        var room = dbContext
            .Rooms
            .FirstOrDefault(r => r.Id == int.Parse(roomId));
            
        if(room != null){
            room.Messages
            .Add(new Message{
                Text = message
            });
            dbContext.SaveChanges();
        }

    }
}


