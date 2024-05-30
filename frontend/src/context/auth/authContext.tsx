import React, {createContext, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export type AuthContextType = {
  token: string
  setToken: (token: string) => void
  releaseToken: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const navigate = useNavigate()

  const login = (token: string) => {
    localStorage.setItem("token", token)
    setToken(token)
    // Configurar el token en el header de Axios después del inicio de sesión
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

    navigate("/")
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    // Eliminar el token del header de Axios después del cierre de sesión
    delete axios.defaults.headers.common["Authorization"]
    navigate("/")
  }
  //<AuthContext.Provider value={{token, login, logout}}>{children}</AuthContext.Provider>

  return (
    <AuthContext.Provider value={{token, setToken: login, releaseToken: logout}}>
      {children}
    </AuthContext.Provider>
  )
}
