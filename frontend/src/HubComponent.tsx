//import {useMemo} from "react"
import {useEffect} from "react"
import useChatroomConnection from "./signalr-connection"

export function HubComponent() {
  const roomId = "1"
  const {messages, sendMessage, JoinRoom} = useChatroomConnection()
  console.log("current messages", messages)
  return (
    <div className="App">
      <span>
        message from signalR:
        <span style={{color: "green"}}>
          {messages.map((x) => x.text).join(", ")}
        </span>{" "}
      </span>
      <br />
      <button
        onClick={() =>
          sendMessage({
            text: new Date().toISOString(),
            roomId,
            username: "luis",
          })
        }
      >
        send new message
      </button>
      <button onClick={() => JoinRoom(roomId, "luis")}>join room</button>
    </div>
  )
}
