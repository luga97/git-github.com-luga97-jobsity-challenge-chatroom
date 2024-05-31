using ChatRoom.API.Entities;
using ChatRoom.API.Hubs;
using ChatRoom.API.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;

namespace ChatRoom.API.Services;

public class UserService
{
    private readonly AppDbContext dbContext;

    public UserService(AppDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public User CreateUser(string username,string password){
        var foundUser = dbContext.Users.FirstOrDefault(x => x.Username == username);
        
        if(foundUser != null) throw new Exception("username already exist, please try with another."); 

        var (salt, hash) = PasswordHelper.EncryptPassword(password);

        var newUser = new User {            Username = username,
            PasswoordHash = hash,
            PasswordSalt = salt
        };

        dbContext.Users.Add(newUser);
        dbContext.SaveChanges();

        return newUser;
    }

    public bool AuthenticateUser(string username, string password, out User? user)
    {
        user = null;
        user = dbContext.Users.FirstOrDefault(u => u.Username == username);
        if (user == null) return false;

        if (!PasswordHelper.VerifyPassword(password, user.PasswordSalt, user.PasswoordHash))
            return false;

        return true;
    }

    public User? GetUser(string username){
        return dbContext.Users.FirstOrDefault(x => x.Username == username);
    }
}