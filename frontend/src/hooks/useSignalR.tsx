import {useState, useEffect, useRef, useCallback} from "react"
import * as signalR from "@microsoft/signalr"
import {MessageDTO, RoomDTO} from "../types"
import {useAuth} from "../context/auth/useAuth"

const useSignalR = (url: string, options = {}) => {
  const {releaseToken} = useAuth() //todo fix
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState(null)
  const connectionRef = useRef<signalR.HubConnection | null>(null)
  const [rooms, setRooms] = useState<RoomDTO[]>([])
  console.log("hook render", connectionRef.current?.state)

  useEffect(() => {
    if (!connectionRef.current) {
      const conn = new signalR.HubConnectionBuilder()
        .withUrl(url, options)
        .withAutomaticReconnect()
        .build()
      conn.onclose(() => console.log("closing connection!!!"))
      conn.onreconnected(() => console.log("reconecting!!!!"))
      connectionRef.current = conn
    }

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (connectionRef.current) {
      const connection = connectionRef.current
      connection
        .start()
        .then(() => {
          console.log("connected")

          setIsConnected(true)
        })
        .catch((err) => {
          console.log("error connecting", err)
          setIsConnected(false)
          setError(err)
          if (err.message && err.message.includes(`Status code '401'`)) {
            releaseToken()
          }
        })

      connection.onclose(() => {
        setIsConnected(false)
      })
    }
  }, [connectionRef])

  useEffect(() => {
    const getRooms = async () => {
      if (connectionRef.current && isConnected) {
        console.log("getRooms called", connectionRef.current?.state)
        const result = await connectionRef.current.invoke("GetRooms")
        setRooms(result)
      }
    }
    getRooms()
  }, [connectionRef, isConnected])

  useEffect(() => {
    const RoomCreatedListener = async () => {
      if (connectionRef.current && isConnected) {
        console.log("RoomCreated called", connectionRef.current?.state)
        connectionRef.current.on("RoomCreated", (room: RoomDTO) => {
          setRooms((prevState) => [...prevState, room])
        })
      } else {
        console.error("Connection is not established")
      }
    }

    RoomCreatedListener()
  }, [connectionRef, isConnected])

  useEffect(() => {
    const setMessageListener = async () => {
      if (connectionRef.current && isConnected) {
        console.log("setMessageListener called", connectionRef.current?.state)
        connectionRef.current.on("NewMessage", (mesage: MessageDTO) => {
          setRooms((prevState) => {
            return prevState.map((room) => {
              if (room.id != mesage.roomId) return room
              return {
                ...room,
                messages: [...room.messages, mesage],
              }
            })
          })
        })
      }
    }

    setMessageListener()
  }, [connectionRef, isConnected])

  const newMessageSender = useCallback(
    async (message: MessageDTO) => {
      if (connectionRef.current && isConnected) {
        console.log("SendMessage called")
        await connectionRef.current.send("SendMessage", message)
      }
    },
    [connectionRef, isConnected]
  )

  const createRoomSender = useCallback(
    async (room: RoomDTO) => {
      if (connectionRef.current && isConnected) {
        console.log("CreateRoom called", room)
        await connectionRef.current.send("CreateRoom", room)
      }
    },
    [connectionRef, isConnected]
  )

  return {isConnected, error, rooms, newMessageSender, createRoomSender}
}

export default useSignalR
