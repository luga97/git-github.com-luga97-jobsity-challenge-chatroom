using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ChatRoom.API.Controllers;
public class HomeController: ControllerBase {
    [HttpGet("/")]
    public IActionResult Test(){
        return Ok("hello world");
    }
}