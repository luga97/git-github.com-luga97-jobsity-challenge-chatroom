export interface RoomDTO {
  id: string
  name: string
  description: string
  messages: MessageDTO[]
}

export type MessageDTO = {
  roomId: string
  username: string
  text: string
  createdAt?: Date
}

export type CreateRoomDTO = {
  name: string
  description: string
}
