import {useAuth} from "../context/auth/useAuth"
import {Navigate, Outlet} from "react-router-dom"

export function ProtectedLayout() {
  const {token} = useAuth()

  if (!token) {
    return <Navigate to="/signin" />
  }

  return <Outlet />
}
