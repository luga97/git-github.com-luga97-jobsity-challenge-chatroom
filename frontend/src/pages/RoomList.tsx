import {useNavigate} from "react-router-dom"
import {Room} from "../types"
import {RoomsListItem} from "./ChatRoomsListItem"

export function RoomList({rooms}: {rooms: Room[]}) {
  const navigate = useNavigate()
  return (
    <ul className="flex-grow scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200  gap-4 overflow-y-scroll pr-4 flex flex-col">
      {rooms.map((room) => (
        <RoomsListItem room={room} />
      ))}
    </ul>
  )
}
