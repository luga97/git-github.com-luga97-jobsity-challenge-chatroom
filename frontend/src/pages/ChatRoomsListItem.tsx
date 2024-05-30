import {FaLock} from "react-icons/fa"
import {useNavigate} from "react-router-dom"

export function ChatRoomsListItem({
  title,
  description,
  participants,
  userBellow,
}: {
  title: string
  description: string
  participants: number
  userBellow: boolean
}) {
  const navigate = useNavigate()
  function handleClick() {
    if (!userBellow) {
      alert("necesitas unirte")
      return
    }
    navigate(`/1`)
  }
  return (
    <li
      className={`relative flex flex-col w-full rounded ${
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
