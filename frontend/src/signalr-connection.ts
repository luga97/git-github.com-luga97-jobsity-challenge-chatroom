import {useEffect, useState, useCallback} from "react"
import * as signalR from "@microsoft/signalr"
const baseUrl = "http://localhost:5149" // or whatever your backend port is
//const baseUrl = "https://localhost:7128" // or whatever your backend port is

type Message = {
  roomId: string
  username: string
  text: string
}

function useChatroomConnection() {
  const [messages, setMessages] = useState<Message[]>([])
  const {connection} = useSignalRConnection()
  const {isLoadingMessages, fetchMessages} = useFetchLastMessages()

  useEffect(() => {
    fetchMessages("1", (messages) => {
      setMessages((prevMessages) => [...prevMessages, ...messages])
    })
  }, [fetchMessages])

  const newMessageHandler = useCallback(
    (roomId: string, username: string, text: string) => {
      console.log("recibiendo mensaje", {roomId, username, text})
      setMessages((prevMessages) => [...prevMessages, {roomId, username, text}])
    },
    []
  )

  useEffect(() => {
    if (connection) {
      connection.on("NewMessage", newMessageHandler)
    }

    return () => {
      if (connection) {
        connection.off("NewMessage", newMessageHandler)
      }
    }
  }, [connection, newMessageHandler])

  const sendMessage = async (message: Message) => {
    console.log(connection)
    if (connection) {
      try {
        await connection.send(
          "SendMessage",
          message.roomId,
          message.username,
          message.text
        )
        console.log("Sent message:", message)
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  const JoinRoom = async (roomId: string, username: string) => {
    if (connection) {
      try {
        await connection.send("JoinRoom", roomId, username)
        console.log(`Sent join room: \nRommId=${roomId} \nUser=${username}`)
      } catch (error) {
        console.error(
          `Error sending join room: \nRommId=${roomId} \nUser=${username}`,
          error
        )
      }
    }
  }

  const leaveRoom = async (roomId: string, username: string) => {
    if (connection) {
      try {
        await connection.send("JoinRoom", roomId, username)
        console.log(`Sent leave room: \nRommId=${roomId} \nUser=${username}`)
      } catch (error) {
        console.error(
          `Error sending leave room: \nRommId=${roomId} \nUser=${username}`,
          error
        )
      }
    }
  }

  return {
    isLoadingMessages,
    messages,
    sendMessage,
    JoinRoom,
    leaveRoom,
  }
}

function useFetchLastMessages() {
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const fetchMessages = useCallback(
    async (roomId: string, handler: (messages: Message[]) => void) => {
      try {
        setIsLoadingMessages(true)
        const response = await fetch(`${baseUrl}/Rooms/${roomId}/messages?limit=50`)
        const data = await response.json()
        handler(data)
      } catch (error) {
        console.error("Error fetching messages:", error)
      }
    },
    []
  )

  return {
    isLoadingMessages,
    fetchMessages,
  }
}

function useSignalRConnection() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null)

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/chathub`) // TODO: change to securized hub
      .withAutomaticReconnect()
      .build()

    connection
      .start()
      .then(() => {
        console.log("Connection started!")
        setConnection(connection)
      })
      .catch((err) => console.error("Connection failed: ", err))

    return () => {
      connection.stop().then(() => console.log("Connection stopped"))
      setConnection(null)
    }
  }, [])

  return {
    connection,
  }
}

export default useChatroomConnection
