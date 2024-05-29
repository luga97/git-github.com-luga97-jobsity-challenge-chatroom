
namespace ChatRoom.API.Entities;

public class Room {
    public string Id { get; set; } = string.Empty;
    public string RoomName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Owner { get; set; } = string.Empty;

    public List<Message> Messages { get; set; } = [];
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
