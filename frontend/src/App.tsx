import "./App.css"
import {AuthProvider} from "./context/auth/authContext"
import {useAuth} from "./context/auth/useAuth"
import {Navigate, Outlet, Route, Routes} from "react-router-dom"
import {LoginPage} from "./pages/LoginPage"
import {NotFoundPage} from "./pages/NotFoundPage"
import {LoadingProvider} from "./context/loading/loadingContext"
import {useLoading} from "./context/loading/useLoading"
import {SignUpPage} from "./pages/SignUpPage"
//import {NotFoundPage} from "./pages/NotFoundPage"

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<UnprotectedLayout />}>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
        <LoadingOverlay />
      </AuthProvider>
    </LoadingProvider>
  )
}

function HomePage() {
  return <Secret />
}

export function ProtectedLayout() {
  const {token} = useAuth()

  if (!token) {
    return <Navigate to="/signin" />
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

// Componente para mostrar el overlay de carga global
function LoadingOverlay() {
  const {loading} = useLoading()

  return (
    loading && (
      <div className="loading-overlay">
        <div className="loading-indicator">Loading...</div>
      </div>
    )
  )
}

export default App
