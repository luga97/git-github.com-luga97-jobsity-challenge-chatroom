import {useAuth} from "../context/auth/useAuth"
import {Navigate, Outlet} from "react-router-dom"

export function UnprotectedLayout() {
  const {token} = useAuth()

  if (token) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
