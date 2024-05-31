using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ChatRoom.API.DTOs;

public record CreateRoomDTO(
    [Required]
    [NotNull]
    string Name,  

    [Required]
    [NotNull]
    string Description
);