using System.Security.Claims;
using ChatRoom.API.DTOs;
using ChatRoom.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ChatRoom.API.Controllers;

[ApiController]
[Route("[Controller]")]
[Authorize]
public class RoomsController(RoomService service): ControllerBase {
    /// <summary>
    /// Create a new room
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost]
    public IActionResult CreateNewRoom([FromBody] CreateRoomDTO dto){
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(username == null) return Unauthorized();
        service.CreateRoom(dto,username);
        return Ok();
    }

    [HttpGet()]
    public IActionResult GetAllRooms(){
        return Ok(service.GetAllRooms());
    }

    [HttpGet("{roomId}/Messages")]
    public IActionResult GetRoomMessages(string RoomId,[FromQuery] int? limit){

        try
        {
            var result = service.GetRoomMessages(RoomId,limit);
            return Ok(result);
        }
        catch (System.Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}