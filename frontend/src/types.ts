export interface User {
  id: number
  username: string
  passwordHash: string
  passwordSalt: string
  rooms: (Room | null)[]
  ownedRooms: (Room | null)[]
}

export interface Room {
  id: number
  roomName: string
  description: string
  owner: User
  createdAt: string
  messages: Message[] // Tipo de mensaje desconocido
  participants: User[]
}

export interface Message {}
