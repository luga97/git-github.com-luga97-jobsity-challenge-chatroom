import * as signalR from "@microsoft/signalr"
const URL = "http://localhost:5149/chathub" //or whatever your backend port is
class Connector {
  private connection: signalR.HubConnection
  public events: (onMessageReceived: (username: string, message: string) => void) => void
  static instance: Connector

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL) //TODO change to securized hub
      .withAutomaticReconnect()
      .build()

    this.connection.start().catch((err) => document.write(err))

    this.events = (onMessageReceived) => {
      this.connection.on("ReceiveMessage", (username, message) => {
        onMessageReceived(username, message)
      })
    }
  }

  public newMessage = (message: string) => {
    console.log("sending message ", message)
    this.connection
      .send("SendMessage", "foo", message)
      .then(() => console.log("sent message", message))
      .catch((error) => console.error("Error sending message:", error))
  }

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector()
    return Connector.instance
  }
}

export default Connector.getInstance
