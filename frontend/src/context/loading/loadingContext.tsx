// LoadingContext.js
import React, {createContext, useState} from "react"

export type LoadinContextType = {
  loading: boolean
  startLoading: () => void
  stopLoading: () => void
}

export const LoadingContext = createContext<LoadinContextType | null>(null)

export const LoadingProvider = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(false)

  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  return (
    <LoadingContext.Provider value={{loading, startLoading, stopLoading}}>
      {children}
    </LoadingContext.Provider>
  )
}
