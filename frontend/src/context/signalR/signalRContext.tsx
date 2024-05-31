import React, {createContext, ReactNode} from "react"
import useSignalR from "../../hooks/useSignalR"
import {MessageDTO, RoomDTO} from "../../types"
export interface SignalRContextProps {
  isConnected: boolean
  error: Error | null
  newMessageSender: (message: MessageDTO) => Promise<void>
  createRoomSender: (room: RoomDTO) => Promise<void>
  rooms: RoomDTO[]
}

export const SignalRContext = createContext<SignalRContextProps | undefined>(undefined)

interface SignalRProviderProps {
  url: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any
  children: ReactNode
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({
  url,
  options,
  children,
}) => {
  const {isConnected, newMessageSender, createRoomSender, error, rooms} = useSignalR(
    url,
    options
  )

  return (
    <SignalRContext.Provider
      value={{isConnected, error, newMessageSender, createRoomSender, rooms}}
    >
      {children}
    </SignalRContext.Provider>
  )
}
