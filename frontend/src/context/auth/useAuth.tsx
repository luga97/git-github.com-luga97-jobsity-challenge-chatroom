import {useContext} from "react"
import {AuthContextType, AuthContext} from "./authContext"

export function useAuth(): AuthContextType {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error("useAuth must be used inside an AuthProvider")
  }

  return auth
}
