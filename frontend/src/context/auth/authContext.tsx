import React, {createContext, useState} from "react"

export type AuthContextType = {
  token: string
  username: string
  setToken: (token: string) => void
  setUsername: (username: string) => void
  releaseToken: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [username, setStateUsername] = useState(localStorage.getItem("username") || "")
  const [token, setStateToken] = useState(localStorage.getItem("token") || "")

  function setToken(token: string) {
    localStorage.setItem("token", token)
    setStateToken(token)
  }

  function setUsername(username: string) {
    localStorage.setItem("username", username)
    setStateUsername(username)
  }

  function releaseToken() {
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    setStateToken("")
    setStateUsername("")
  }
  //<AuthContext.Provider value={{token, login, logout}}>{children}</AuthContext.Provider>

  return (
    <AuthContext.Provider value={{token, username, setToken, releaseToken, setUsername}}>
      {children}
    </AuthContext.Provider>
  )
}
