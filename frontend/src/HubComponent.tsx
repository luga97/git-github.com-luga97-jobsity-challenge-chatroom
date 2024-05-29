import {useEffect, useState} from "react"
import Connector from "./signalr-connection"
export function HubComponent() {
  const {newMessage, events} = Connector()
  const [message, setMessage] = useState("initial value")
  useEffect(() => {
    events((user, message) => {
      console.log("mensaje recibido")
      return setMessage(user + " says " + message)
    })
  })
  return (
    <div className="App">
      <span>
        message from signalR: <span style={{color: "green"}}>{message}</span>{" "}
      </span>
      <br />
      <button onClick={() => newMessage(new Date().toISOString())}>send date </button>
    </div>
  )
}
