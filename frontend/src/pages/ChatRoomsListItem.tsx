import {useNavigate, useParams} from "react-router-dom"
import {RoomDTO} from "../types"

export function RoomsListItem({room}: {room: RoomDTO}) {
  const navigate = useNavigate()
  const {id} = useParams()

  const description = room.description
  const title = room.roomName
  function handleClick() {
    navigate(`/${room.id}`)
  }
  return (
    <li
      className={`flex flex-col gap-1 w-full min-w-80 rounded-xl shadow-sm border border-gray-300 ${"bg-white"} p-4 hover:cursor-pointer ${
        id == room.id.toString() && "bg-blue-200 shadow-lg"
      }`}
      onClick={handleClick}
    >
      <span className="font-bold text-xl">{title}</span>
      <span className="text-sm">{description}</span>
    </li>
  )
}
