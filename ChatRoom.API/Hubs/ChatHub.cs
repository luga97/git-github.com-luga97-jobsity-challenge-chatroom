using ChatRoom.API.Services;
using Microsoft.AspNetCore.SignalR;

namespace ChatRoom.API.Hubs;

public class ChatHub(RoomService roomService) : Hub
{

        // Método que se llama cuando un cliente se conecta al Hub
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine("connected");

        // Opcional: Lógica inicial cuando un usuario se conecta
        await base.OnConnectedAsync();
    }

    // Método que se llama cuando un cliente se desconecta del Hub
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine("disconnected");

        // Opcional: Lógica para cuando un usuario se desconecta, como removerlo de grupos
        await base.OnDisconnectedAsync(exception);
    }


    public async Task SendMessage(string roomId,string user, string message)
    {
        roomService.SaveRoomMessage(roomId,user,message);
        Console.WriteLine("received message");
        await Clients.Group(roomId).SendAsync("NewMessage", roomId,user, message);
    }

        // Método para que el usuario se una a un grupo específico
    public async Task JoinRoom(string roomId,string username)
    {
        Console.WriteLine("received joined room");
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        await Clients.Group(roomId).SendAsync("UserJoinedRoom", $"{username} just joined the room.");
    }

    // Método para que el usuario abandone un grupo específico
    public async Task LeaveRoom(string roomId)
    {
        Console.WriteLine("leavingRoom");

        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        await Clients.Group(roomId).SendAsync("UserLeavedRoom", $"{Context.ConnectionId} just leave the room.");
    }
}