import {useAuth} from "../context/auth/useAuth"
import {useParams} from "react-router-dom"
import {SignalRProvider} from "../context/signalR/signalRContext"
import {RoomsSideBar} from "../components/RoomsSideBar"
import {ChatComponent} from "../components/ChatComponent"
const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5149"

const SIGNALR_URL = `${apiUrl}/chathub`

export function RoomsLayout() {
  const {id: paramId} = useParams()
  const {token} = useAuth()

  return (
    <SignalRProvider
      url={SIGNALR_URL}
      options={{
        accessTokenFactory: () => token,
      }}
    >
      <div
        id="focusable"
        tabIndex={0}
        className="flex w-full h-screen"
        onKeyUp={(e) => {
          if (e.key == "Escape") {
            console.log("escape, capture close chat")
          }
        }}
      >
        <RoomsSideBar />
        <div className="flex-grow border-l border-gray-400">
          <ChatComponent roomId={paramId} />
        </div>
      </div>
    </SignalRProvider>
  )
}
