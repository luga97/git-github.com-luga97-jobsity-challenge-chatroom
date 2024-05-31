using ChatRoom.API.DTOs;
using ChatRoom.API.Entities;
using ChatRoom.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ChatRoom.API.Hubs;

[Authorize]
public class ChatHub(RoomService roomService) : Hub
{
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine("connected");
        await Task.CompletedTask;
    }

    public async Task<dynamic> GetRooms()
    {
        // Obtener la lista de chat rooms desde la base de datos o cualquier fuente de datos
        IEnumerable<Room> rooms = roomService.GetAllRooms();
        var ids = rooms.Select(r => r.Id.ToString());
        foreach (var roomId in ids)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        }
        var result = rooms.Select(MapRoomToDTO);
        return result;
    }

    private static dynamic MapRoomToDTO(Room room)
    {
        Console.WriteLine("total msgs " + room.Messages.Count);
        return new
        {
            Id = room.Id.ToString(),
            RoomName = room.RoomName,
            Description = room.Description,
            Messages = room.Messages
                .OrderBy(x => x.CreatedAt)
                .TakeLast(50)
                .Select(message => MapMessageDTO(message, room.Id.ToString()))
        };
    }

    private static dynamic MapMessageDTO(Message message, string roomId)
    {
        return new
        {
            RoomId = roomId,
            Username = message.Users.Username,
            Text = message.Text,
            CreatedAt = message.CreatedAt
        };
    }

    // Método que se llama cuando un cliente se desconecta del Hub
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine("disconnected");
        var rooms = roomService.GetAllRooms();
        foreach (var room in rooms)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.Id.ToString());
        }
        // Opcional: Lógica para cuando un usuario se desconecta, como removerlo de grupos
    }


    public async Task SendMessage(NewMessageDTO dto)
    {
        Console.WriteLine("received message " + dto.RoomId + dto.Username + dto.Text);
        var message = roomService.SaveRoomMessage(dto);
        if(message != null){
            object result = MapMessageDTO(message,dto.RoomId);
            await Clients.Group(dto.RoomId).SendAsync("NewMessage", result);
        }
  
    }

    public async Task CreateRoom(CreateRoomDTO dto)
    {
        Console.WriteLine("creating room");
        var room = roomService.CreateRoom(dto, Context.UserIdentifier!);
        object result = MapRoomToDTO(room);
        var roomId = room.Id.ToString();
        await Clients.All.SendAsync("RoomCreated", result);
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }

    public dynamic GetMessages(string roomId)
    {
        return roomService.GetRoomMessages(roomId, 50).Select(message => MapMessageDTO(message,roomId));
    }
}
