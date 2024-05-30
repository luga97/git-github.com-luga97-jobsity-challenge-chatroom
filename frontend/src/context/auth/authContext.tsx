import React, {createContext, useState} from "react"

export type AuthContextType = {
  token: string
  setToken: (token: string) => void
  releaseToken: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setStateToken] = useState(localStorage.getItem("token") || "")

  function setToken(token: string) {
    localStorage.setItem("token", token)
    setStateToken(token)
  }

  function releaseToken() {
    localStorage.removeItem("token")
    setStateToken("")
  }
  //<AuthContext.Provider value={{token, login, logout}}>{children}</AuthContext.Provider>

  return (
    <AuthContext.Provider value={{token, setToken, releaseToken}}>
      {children}
    </AuthContext.Provider>
  )
}
