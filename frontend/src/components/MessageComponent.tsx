import {MessageDTO} from "../types"

export function MessageComponent({
  message: {username, text, createdAt},
}: {
  message: MessageDTO
}) {
  return (
    <div className="flex flex-col border-t py-4 gap-1">
      <span className="font-bold font-mono text-xl text-sky-800 mr-2">{username}</span>
      <span className="text-lg ">{text}</span>
      <span className="text-sm text-gray-500">
        {createdAt?.toString() ?? new Date().toTimeString()}
      </span>
    </div>
  )
}
