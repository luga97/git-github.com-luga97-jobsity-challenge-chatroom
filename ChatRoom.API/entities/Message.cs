namespace ChatRoom.API.Entities;

public class  Message {
    public string Username { get; set; } = string.Empty;

    public string Text { get; set; } =  string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.Now;
}