import {useAuth} from "../context/auth/useAuth"
import {MdLogout} from "react-icons/md"
import {RoomList} from "../pages/RoomList"
import {useSignalRContext} from "../context/signalR/useSignalRContext"
import {RoomDTO} from "../types"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)

export function RoomsSideBar() {
  const {releaseToken} = useAuth()
  const {isConnected, rooms, createRoomSender} = useSignalRContext()
  const handleLogout = () => {
    releaseToken()
  }

  const handleCreateRoom = async () => {
    const showModal = async () => {
      const {value: formValues} = await MySwal.fire({
        title: "Create your room",
        showConfirmButton: true,
        confirmButtonText: "Create room",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        html: (
          <div className="flex flex-col">
            <label>room name</label>
            <input id="room-name" className="my-2 border border-gray-300" />
            <label>room description</label>
            <textarea id="room-description" className="my-2 border border-gray-300" />
          </div>
        ),
        focusConfirm: false,
        preConfirm: () => {
          const roomName = (document.getElementById("room-name") as HTMLInputElement)
            .value
          const roomDescription = (
            document.getElementById("room-description") as HTMLTextAreaElement
          ).value
          return {roomName, roomDescription}
        },
      })

      if (formValues) {
        console.log(formValues)
        // Aquí puedes realizar la solicitud con los valores del input
        await createRoomSender({
          description: formValues.roomDescription,
          name: formValues.roomName,
        } as unknown as RoomDTO)
        await MySwal.fire({
          icon: "success",
          title: "Room created sucessful",
        })
      }
    }

    showModal()
  }

  return (
    <div className="max-w-lg min-w-96 flex flex-col bg-blue-100 text-gray-600 px-4 py-4 max-h-screen overflow-hidden">
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
      {isConnected ? (
        <RoomList rooms={rooms} />
      ) : (
        <span className="flex-grow flex items-center justify-center text-xl font-bold">
          loading...
        </span>
      )}
      <button
        disabled={!isConnected}
        onClick={handleCreateRoom}
        className="disabled:bg-gray-500 bg-sky-800 text-white p-2 text-center mt-4 cursor-pointer rounded-xl"
      >
        Create your own room
      </button>
    </div>
  )
}
