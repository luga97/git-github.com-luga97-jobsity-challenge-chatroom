import {MessageDTO} from "../types"
import {IoSend} from "react-icons/io5"
import {useState} from "react"
import {useSignalRContext} from "../context/signalR/useSignalRContext"
import {useAuth} from "../context/auth/useAuth"

export function InputNewMessageComponent({roomId}: {roomId: string}) {
  const [inputNewMessage, setInputNewMessage] = useState("")
  const {isConnected, newMessageSender} = useSignalRContext()
  const {username} = useAuth()

  async function handleSendMessage() {
    newMessageSender({
      text: inputNewMessage,
      roomId: roomId,
      username: username, //todo set context for this
    } as MessageDTO)
  }

  return (
    <div className="flex p-2 py-3">
      <input
        value={inputNewMessage}
        onChange={(e) => setInputNewMessage(e.target.value)}
        disabled={!isConnected}
        className={`disabled:bg-slate-200 disabled:border-gray-200 flex-grow border h-fit border-blue-200 focus:outline-blue-300 rounded p-1 pl-2 mr-2`}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setInputNewMessage("")
            handleSendMessage()
          }
        }}
      ></input>
      <button
        className={`${isConnected ? "text-blue-700" : "text-gray-500"} text-2xl `}
        onClick={handleSendMessage}
      >
        <IoSend />
      </button>
    </div>
  )
}
