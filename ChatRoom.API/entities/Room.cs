
using System.ComponentModel.DataAnnotations;

namespace ChatRoom.API.Entities;

public class Room {
    [Key]
    public int Id { get; set; }
    public string RoomName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    //TODO required
    public User Owner { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<Message> Messages { get; set; } = [];

    public List<User> Participants { get; set; } = [];
}
