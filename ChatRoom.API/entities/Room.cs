
using System.ComponentModel.DataAnnotations;

namespace ChatRoom.API.Entities;

public class Room {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public List<Message> Messages { get; set; } = [];

}
