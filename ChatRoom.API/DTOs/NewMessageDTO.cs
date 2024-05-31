namespace ChatRoom.API.Hubs;

public record NewMessageDTO(string RoomId, string Username, string Text);