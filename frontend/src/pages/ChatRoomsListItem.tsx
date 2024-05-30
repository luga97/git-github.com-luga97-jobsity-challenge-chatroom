import {FaLock} from "react-icons/fa"
import {useNavigate} from "react-router-dom"
import {Room} from "../types"

export function RoomsListItem({room}: {room: Room}) {
  const navigate = useNavigate()

  const description = room.description
  const participants = room.participants.length
  const title = room.roomName
  const userBellow = room.participants.some((x) => x.username == "luis2") //todo change
  function handleClick() {
    if (!userBellow) {
      alert("necesitas unirte")
      return
    }
    navigate(`/${room.id}`)
  }
  return (
    <li
      className={`relative flex flex-col w-full min-w-80 rounded-xl shadow-sm border border-gray-300 ${
        userBellow ? "bg-white" : "bg-gray-200"
      } p-4 hover:cursor-pointer`}
      onClick={handleClick}
    >
      <span className="font-bold text-xl">{title}</span>
      {!userBellow && <FaLock className="absolute right-5 top-5" />}
      <span className="text-md">
        <span className="text-sky-700 font-semibold">{participants} Participants </span>
      </span>
      <span className="text-sm">{description}</span>
    </li>
  )
}

/*
  return (
    <Link to="/1">
      <li
        className={`relative flex flex-col w-full rounded ${
          userBellow ? "bg-white" : "bg-gray-200"
        } p-4 hover:cursor-pointer`}
      >
        <span className="font-bold text-xl">{title}</span>
        {!userBellow && <FaLock className="absolute right-5 top-5" />}
        <span className="text-md">
          <span className="text-sky-700 font-semibold">{participants} Participants </span>
        </span>
        <span className="text-sm">{description}</span>
      </li>
    </Link>
  )
  */
