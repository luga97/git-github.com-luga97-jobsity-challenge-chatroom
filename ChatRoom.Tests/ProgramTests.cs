namespace ChatRoom.Tests;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;
using RabbitMQ.Client;
using System.Text;


[TestFixture]
public class ProgramTests
{
    [Test]
    public async Task GetStockQuote_WithValidStockCode_ReturnsDecimal()
    {
        // Arrange
        string validStockCode = "aapl.us"; // Stock code for Apple Inc.

        // Act
        var result = await Program.GetStockQuote(validStockCode);

        // Assert
        Assert.That(result, Is.GreaterThan(0)); // Assert that the result is a positive number
    }

    [Test]
    public void GetStockQuote_WithInvalidStockCode_ThrowsStockNotFoundException()
    {
        // Arrange
        string invalidStockCode = "INVALID"; // Invalid stock code

        // Act & Assert
        Assert.ThrowsAsync<StockNotFoundException>(async () => await Program.GetStockQuote(invalidStockCode));
    }
}

