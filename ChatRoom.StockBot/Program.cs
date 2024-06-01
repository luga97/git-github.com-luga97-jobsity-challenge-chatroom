using System.Globalization;
using System.Text;
using CsvHelper;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

class Program
{
    private const string StockApiUrl = "https://stooq.com/q/l/?s={0}&f=sd2t2ohlcv&h&e=csv";

    public static async Task Main(string[] args)
    {
        var envVar = Environment.GetEnvironmentVariable("RUNNING_WITH_DOCKER");

        string rabbitHost = "localhost";

        if (bool.TryParse(envVar, out var isRunningWithDocker) && isRunningWithDocker)
        {
            rabbitHost = "rabbitmq";
        }
        System.Console.WriteLine("rabbitmq host is '{0}'", rabbitHost);
        var factory = new ConnectionFactory() { HostName = rabbitHost };
        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();
        channel.QueueDeclare(queue: "stock_requests", durable: false, exclusive: false, autoDelete: false, arguments: null);
        channel.QueueDeclare(queue: "chat_messages", durable: false, exclusive: false, autoDelete: false, arguments: null);

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            await ProcessMessage(channel, body);
        };

        channel.BasicConsume(queue: "stock_requests", autoAck: true, consumer: consumer);

        Console.WriteLine("Bot is running...");
        await Task.Run(() => Thread.Sleep(Timeout.Infinite));
    }

    private static async Task ProcessMessage(IModel channel, byte[] body)
    {
        var message = Encoding.UTF8.GetString(body);
        var request = JsonConvert.DeserializeObject<StockRequest>(message);
        string? resultMessage = null;
        if (request == null)
        {
            Console.WriteLine("stock request can't not be processed, ignoring message");
            return;
        };

        try
        {
            var stockQuote = await GetStockQuote(request.StockCode);
            resultMessage = $"{request?.StockCode.ToUpper()} quote is ${stockQuote} per share";
        }
        catch (StockNotFoundException)
        {
            resultMessage = $"Oops 😶‍🌫️, the stock stock code \"{request.StockCode}\" wasn't found. Please check it and try again.";
        }
        catch (Exception)
        {
            resultMessage = $"An unexpected error occurred: please try again later.";
        }
        var stockResponse = new StockResponse(request!.Room, resultMessage);
        var responseBytes = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(stockResponse));

        channel.BasicPublish(exchange: "", routingKey: "chat_messages", basicProperties: null, body: responseBytes);
    }

    private static async Task<decimal> GetStockQuote(string stockCode)
    {
        using var httpClient = new HttpClient();
        var response = await httpClient.GetStringAsync(string.Format(StockApiUrl, stockCode));
        using var reader = new StringReader(response);
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        var records = csv.GetRecords<dynamic>();
        foreach (var record in records)
        {
            if (record.Close == "N/D") throw new StockNotFoundException();
            return Convert.ToDecimal(record.Close);
        }
        return default;
    }
}

public record StockRequest(string Room, string StockCode);

public record StockResponse(string Room, string Message);

public class StockNotFoundException : Exception
{
    public StockNotFoundException() : base("Stock not found.") { }
}