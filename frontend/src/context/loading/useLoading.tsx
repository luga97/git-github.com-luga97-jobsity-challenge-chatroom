import {useContext} from "react"
import {LoadinContextType, LoadingContext} from "./loadingContext"

export function useLoading(): LoadinContextType {
  const context = useContext(LoadingContext)

  if (!context) {
    throw new Error("useLoading must be used inside an LoadingProvider")
  }

  return context
}
