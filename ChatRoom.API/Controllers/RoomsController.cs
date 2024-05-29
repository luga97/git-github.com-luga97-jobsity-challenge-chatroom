using ChatRoom.API.DTOs;
using ChatRoom.API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ChatRoom.API.Controllers;

[ApiController]
[Route("[Controller]")]
public class RoomsController(RoomService service): ControllerBase {
    /// <summary>
    /// Create a new room
    /// </summary>
    /// <param name="dto"></param>
    /// <returns></returns>
    [HttpPost]
    public IActionResult CreateNewRoom([FromBody] CreateRoomDTO dto){
        service.CreateRoom(dto);
        return Ok();
    }

    [HttpGet()]
    public IActionResult GetAllRooms(){
        return Ok(service.GetAllRooms());
    }

    [HttpGet("{roomId}/Messages")]
    public IActionResult GetRoomMessages(string RoomId,[FromQuery] int? limit){

        var result = service.GetRoomMessages(RoomId,limit);

        if(result.IsSuccess) {
            return Ok(result.Value);    
        }
        
        return result.Exception switch
        {
            RoomNotFoundException => NotFound("Room not found"),
            _ => BadRequest("something went wrong")
        };
        

    }
}