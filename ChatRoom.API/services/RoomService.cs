using ChatRoom.API.DTOs;
using ChatRoom.API.Entities;
using ChatRoom.API.Utils;
using Microsoft.Extensions.Caching.Memory;

namespace ChatRoom.API.Services;
//TODO CREATE ABSTRACTION WITH -> IN MEMORY IMPL, DATABASE IMPL
public class RoomService {
    private readonly List<Room> rooms = [];
    private int lastRoomId;
    private IMemoryCache memoryCache;

    public RoomService(IMemoryCache memoryCache)
    {
        this.memoryCache = memoryCache;
        
        if(memoryCache.TryGetValue(nameof(this.rooms),out List<Room>? rooms)) {
            this.rooms = rooms ?? [];
        }

        if(memoryCache.TryGetValue(nameof(this.lastRoomId),out int lastRoomId)) {
            this.lastRoomId = lastRoomId;
        }
    }

    public void CreateRoom(CreateRoomDTO dto){
        
        lastRoomId++;

        var newRoom = new Room {
            Id = lastRoomId.ToString(),
            RoomName = dto.Name,
            Description = dto.Description,
            Owner = dto.Owner
        };

        rooms.Add(newRoom);
        memoryCache.Set(nameof(rooms),rooms,TimeSpan.FromDays(1)); //MORE TIME IF REQUIRED HERE
        memoryCache.Set(nameof(lastRoomId),lastRoomId,TimeSpan.FromDays(1)); //MORE TIME IF REQUIRED HERE
    }

    public  IEnumerable<Room> GetAllRooms(){
        return rooms;
    }

    internal Result<IEnumerable<Message>?> GetRoomMessages(string roomId, int? limit)
    {
        var room = rooms.Where(room => room.Id == roomId).FirstOrDefault();

        if(room == null) {
            return Result<IEnumerable<Message>>.Failure(new RoomNotFoundException());
        }

        IEnumerable<Message> messages = room.Messages.OrderBy(msg => msg.CreatedAt);
            if(limit.HasValue){
                messages = messages.TakeLast(limit.Value);
            }

        return Result<IEnumerable<Message>?>.Success(messages);
    }

    internal void SaveRoomMessage(string roomId, string user, string message)
    {
        rooms.Find(x => x.Id == roomId)?.Messages.Add(new Message{
            Text = message,
            Username = user
        });

        memoryCache.Set(nameof(rooms),rooms,TimeSpan.FromDays(1)); //MORE TIME IF REQUIRED HERE

    }
}


public class RoomNotFoundException(): Exception;
