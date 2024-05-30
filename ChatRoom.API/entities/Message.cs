using System.ComponentModel.DataAnnotations;

namespace ChatRoom.API.Entities;

public class  Message {
    [Key]
    public int Id { get; set; }
    public User Users { get; set; }
    public Room Room { get; set; }
    public string Text { get; set; } =  string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}