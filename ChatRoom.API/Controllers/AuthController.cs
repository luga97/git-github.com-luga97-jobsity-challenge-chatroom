using ChatRoom.API.Services;
using ChatRoom.API.Utils;
using Microsoft.AspNetCore.Mvc;

namespace ChatRoom.API.Controllers;

[ApiController]
[Route("[Controller]")]
public class AuthController(UserService userService): ControllerBase
{
    [HttpPost("SignUp")]
    public IActionResult SignUp([FromBody] SignUpDTO dto){
        try
        {
            var user = userService.CreateUser(dto.Username,dto.Password);
            var token = JWTHelper.GenerateToken(user);
            return Ok(token);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("SignIn")]
    public IActionResult SignIn([FromBody] SignInDTO dto) {
        if(!userService.AuthenticateUser(dto.Username,dto.Password,out var user)){
            return BadRequest("username or password wrong");
        }

        if(user == null) {
            return BadRequest("user not found");
        }

        return Ok(JWTHelper.GenerateToken(user));
    }
}

public record SignUpDTO(string Username, string Password);
public record SignInDTO(string Username, string Password);