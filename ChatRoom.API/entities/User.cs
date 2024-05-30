using System.ComponentModel.DataAnnotations;
using ChatRoom.API.Controllers;

namespace ChatRoom.API.Entities;

public class User {
    [Key]
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswoordHash { get; set; } = string.Empty;
    public string PasswordSalt { get; set; } = string.Empty;
    public List<Room> Rooms { get; set; } = [];
    public List<Room> OwnedRooms { get; set; } = [];
}