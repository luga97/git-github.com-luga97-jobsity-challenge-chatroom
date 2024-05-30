using System.Text;
using System.Text.Json.Serialization;
using ChatRoom.API.Hubs;
using ChatRoom.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddDbContext<AppDbContext>();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "ChatRoom API", Version = "v1" });

            // Habilitar anotaciones
            c.SupportNonNullableReferenceTypes();
        });


builder.Services.AddScoped<RoomService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddMemoryCache();


var key = Encoding.UTF8.GetBytes("K!4Nduni69w$MhyJY9z%N#ycyXov#6LA");

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "jobsity_chatroom",
        ValidAudience = "local",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("K!4Nduni69w$MhyJY9z%N#ycyXov#6LA"))
    };
});

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseCors(options => options
    .WithOrigins("http://localhost:5173")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
);

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<ChatHub>("/chathub");
app.MapControllers();
app.Run();

