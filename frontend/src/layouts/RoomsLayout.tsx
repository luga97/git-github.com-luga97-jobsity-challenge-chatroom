import {useAuth} from "../context/auth/useAuth"
import {useParams} from "react-router-dom"
import {MdLogout} from "react-icons/md"
import {RoomList} from "../pages/RoomList"
import {useEndpoints} from "../hooks/useEndpoints"
import {useEffect, useState} from "react"
import {Room} from "../types"

export function RoomsLayout() {
  const [rooms, setRooms] = useState<Room[]>([])
  const {releaseToken} = useAuth()
  const {id} = useParams()
  const {getAllRooms} = useEndpoints()

  function handleRooms(data: unknown) {
    console.log(data)
    setRooms(data as Room[])
  }

  useEffect(() => {
    getAllRooms(handleRooms)
  }, [])

  //console.log("id", id)
  const handleLogout = () => {
    releaseToken()
  }

  function handleCreateRoom(): void {
    alert("create room")
  }

  return (
    <div
      id="focusable"
      tabIndex={0}
      className="flex w-full h-screen "
      onKeyUp={(e) => {
        if (e.key == "Escape") {
          console.log("escape, capture close chat")
        }
      }}
    >
      <div className="max-w-lg flex flex-col bg-blue-100 text-gray-600 px-4 py-4 max-h-screen overflow-hidden">
        <div className="flex justify-between mb-4">
          <span className="text-3xl font-bold">Rooms</span>
          <button
            className="font-bold text-red-500 flex items-center "
            onClick={handleLogout}
          >
            <MdLogout />
            <span>Log out</span>
          </button>
        </div>
        <RoomList rooms={rooms} />
        <div
          onClick={handleCreateRoom}
          className="bg-sky-800 text-white p-2 text-center mt-4 cursor-pointer rounded-xl"
        >
          Create your own room{" "}
        </div>
      </div>
      <div className="">
        <span>{id}</span>
      </div>
    </div>
  )
}
