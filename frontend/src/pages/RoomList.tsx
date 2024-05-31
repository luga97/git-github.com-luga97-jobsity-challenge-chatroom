import {RoomDTO} from "../types"
import {RoomsListItem} from "./ChatRoomsListItem"

export function RoomList({rooms}: {rooms: RoomDTO[]}) {
  if (rooms.length == 0)
    return (
      <span className="flex-grow flex items-center justify-center text-xl">
        Create your first room to start
      </span>
    )
  return (
    <ul className="flex-grow scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-200  gap-4 overflow-y-scroll pr-4 flex flex-col">
      {rooms.map((room, index) => (
        <RoomsListItem room={room} key={index} />
      ))}
    </ul>
  )
}
