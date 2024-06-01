import {useNavigate, useParams} from "react-router-dom"
import {RoomDTO} from "../types"

export function RoomsListItem({room}: {room: RoomDTO}) {
  const navigate = useNavigate()
  const {id} = useParams()

  const description = room.description
  const title = room.name
  const isSelected = id == room.id.toString()
  console.log(isSelected)

  function handleClick() {
    navigate(`/${room.id}`)
  }
  return (
    <li
      className={`flex flex-col gap-1 w-full min-w-80 rounded-xl border   p-4 hover:cursor-pointer ${
        isSelected
          ? "bg-blue-200 border-gray-300 shadow-lg "
          : "bg-white border-gray-300  shadow-sm "
      }`}
      onClick={handleClick}
    >
      <span className="font-bold text-xl">{title}</span>
      <span className="text-sm">{description}</span>
    </li>
  )
}
