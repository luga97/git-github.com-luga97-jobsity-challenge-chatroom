import {useContext} from "react"
import {SignalRContextProps, SignalRContext} from "./signalRContext"

export const useSignalRContext = (): SignalRContextProps => {
  const context = useContext(SignalRContext)
  if (!context) {
    throw new Error("useSignalRContext must be used within a SignalRProvider")
  }
  return context
}
