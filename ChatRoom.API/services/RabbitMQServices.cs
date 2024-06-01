using System.Text;
using ChatRoom.API.DTOs;
using ChatRoom.API.Hubs;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ChatRoom.API.Services;
public class RabbitMQService : IDisposable
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private readonly IServiceProvider _serviceProvider;

    public RabbitMQService(IServiceProvider serviceProvider)
    {
        var envVar = Environment.GetEnvironmentVariable("RUNNING_WITH_DOCKER");

        string rabbitHost = "localhost";

        if (bool.TryParse(envVar, out var isRunningWithDocker) && isRunningWithDocker)
        {
            rabbitHost = "rabbitmq";
        }
        Console.WriteLine("rabbitmq host is '{0}'", rabbitHost);
        var factory = new ConnectionFactory() { HostName = rabbitHost };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        _serviceProvider = serviceProvider;
        ListenForBotMessages();
    }

    public IModel GetChannel()
    {
        return _channel;
    }

    private void ListenForBotMessages()
    {
        _channel.QueueDeclare(queue: "chat_messages", durable: false, exclusive: false, autoDelete: false, arguments: null);
        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var response = JsonConvert.DeserializeObject<StockResponseDTO>(Encoding.UTF8.GetString(body));
            await HandleMessage(response);
        };
        _channel.BasicConsume(queue: "chat_messages", autoAck: true, consumer: consumer);
    }

    private async Task HandleMessage(StockResponseDTO response)
    {
        using var scope = _serviceProvider.CreateScope();
        var hubContext = scope.ServiceProvider.GetRequiredService<IHubContext<ChatHub>>();
        await hubContext.Clients.Group(response.Room).SendAsync("NewMessage", new
        {
            RoomId = response.Room,
            Username = "StockBot🪙🤖",
            Text = response.Message,
            CreatedAt = DateTime.UtcNow
        });
    }

    public void Dispose()
    {
        _channel.Close();
        _connection.Close();
    }
}
