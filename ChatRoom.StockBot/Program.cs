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
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();
        channel.QueueDeclare(queue: "stock_requests", durable: false, exclusive: false, autoDelete: false, arguments: null);
        channel.QueueDeclare(queue: "chat_messages", durable: false, exclusive: false, autoDelete: false, arguments: null);

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            var request = JsonConvert.DeserializeObject<StockRequest>(message);
            var stockQuote = await GetStockQuote(request.StockCode);
            var resultMessage = $"{request.StockCode.ToUpper()} quote is ${stockQuote} per share";
            var stockResponse = new StockResponse(request.Room, resultMessage);
            var responseBytes = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(stockResponse));

            channel.BasicPublish(exchange: "", routingKey: "chat_messages", basicProperties: null, body: responseBytes);
        };

        channel.BasicConsume(queue: "stock_requests", autoAck: true, consumer: consumer);

        Console.WriteLine("Bot is running...");
        Console.ReadLine();
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
            return Convert.ToDecimal(record.Close);
        }
        return 0;
    }
}

public record StockRequest(string Room, string StockCode);

public record StockResponse(string Room, string Message);
