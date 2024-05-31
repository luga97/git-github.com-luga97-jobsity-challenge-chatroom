import {MessageDTO} from "../types"
import {useEffect, useRef, useState} from "react"
import {useSignalRContext} from "../context/signalR/useSignalRContext"
import {WithoutRoomComponent} from "../components/WithoutRoomComponent"
import {MessageComponent} from "./MessageComponent"
import {InputNewMessageComponent} from "./InputNewMessageComponent"

export function ChatComponent({roomId}: {roomId?: string}) {
  const {rooms} = useSignalRContext()
  const [messages, setMessages] = useState<MessageDTO[]>([])
  const chatRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentRoom = rooms.find((r) => r.id == roomId)
    if (currentRoom) setMessages(currentRoom.messages)
  }, [rooms, roomId])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  if (!roomId) return <WithoutRoomComponent />

  return (
    // <div className="flex flex-col max-h-screen">
    <div className="flex flex-col relative  h-screen  max-h-screen">
      {messages.length > 0 ? (
        <div
          ref={chatRef}
          className="flex-grow justify-end p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300"
        >
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} />
          ))}
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center text-gray-400 text-xl ">
          Start a new conversation
        </div>
      )}
      {/* <div className="bg-red-500 h-[3000px] overflow-y-scroll"></div> */}
      <div className="w-full">
        <InputNewMessageComponent roomId={roomId} />
      </div>
    </div>
  )
}
