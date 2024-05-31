using ChatRoom.API.DTOs;
using ChatRoom.API.Entities;
using ChatRoom.API.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace ChatRoom.API.Services;
public class RoomService(AppDbContext dbContext){

    public Room CreateRoom(CreateRoomDTO dto,string username){
        var user = dbContext.Users.First(x => x.Username == username);
        var newRoom = new Room {
            RoomName = dto.Name,
            Description = dto.Description
        };

        dbContext.Rooms.Add(newRoom);
        dbContext.SaveChanges();
        return newRoom;
    }

    public  IEnumerable<Room> GetAllRooms(){
        return dbContext.Rooms
        .Include(r => r.Messages)
        .ThenInclude(m => m.Users);
    }

    public IEnumerable<Message> GetRoomMessages(string roomId, int? limit)
    {
        var room = dbContext.Rooms
            .Include(r => r.Messages)
            .ThenInclude(m => m.Users)
            .Where(r => r.Id == int.Parse(roomId))
            .FirstOrDefault() ?? throw new Exception("Room not found");
        Console.WriteLine();
        IEnumerable<Message> messages = room.Messages.OrderBy(msg => msg.CreatedAt);
            if(limit.HasValue){
                messages = messages.TakeLast(limit.Value);
            }
        return messages;
    }

    public Message? SaveRoomMessage(NewMessageDTO dto)
    {

        var room = dbContext
            .Rooms
            .Include(x => x.Messages)
            .ThenInclude(x => x.Users)
            .FirstOrDefault(r => r.Id == int.Parse(dto.RoomId));

        var user = dbContext.Users.FirstOrDefault(x =>  x.Username == dto.Username);
            
        if(room != null && user != null){
            var newMessage = new Message{
                Text = dto.Text,
                Users = user  
            };
            room.Messages
            .Add(newMessage);
            dbContext.SaveChanges();
            Console.WriteLine("Message saved " + room.Messages.Count);
            return newMessage;
        }
        return null;
    }
}


