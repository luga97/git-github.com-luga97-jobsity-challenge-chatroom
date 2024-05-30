import "./App.css"
import {AuthProvider} from "./context/auth/authContext"
import {useAuth} from "./context/auth/useAuth"
import {Navigate, Outlet, Route, Routes} from "react-router-dom"
import {LoginPage} from "./pages/LoginPage"
import {NotFoundPage} from "./pages/NotFoundPage"
//import {NotFoundPage} from "./pages/NotFoundPage"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<UnprotectedLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

function HomePage() {
  return <Secret />
}

export function ProtectedLayout() {
  const {token} = useAuth()

  if (!token) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export function UnprotectedLayout() {
  const {token} = useAuth()

  if (token) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export function Secret() {
  const {releaseToken} = useAuth()

  const handleLogout = () => {
    releaseToken()
  }

  return (
    <div>
      <h1>This is a Secret page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default App
