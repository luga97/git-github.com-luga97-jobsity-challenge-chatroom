import "./App.css"
import {AuthProvider} from "./context/auth/authContext"
import {Route, Routes} from "react-router-dom"
import {LoginPage} from "./pages/LoginPage"
import {NotFoundPage} from "./pages/NotFoundPage"
import {LoadingProvider} from "./context/loading/loadingContext"
import {SignUpPage} from "./pages/SignUpPage"

import {ProtectedLayout} from "./layouts/ProtectedLayout"
import {UnprotectedLayout} from "./layouts/UnprotectedLayout"
import {LoadingOverlay} from "./LoadingOverlay"
import {RoomsLayout} from "./layouts/RoomsLayout"
//import {NotFoundPage} from "./pages/NotFoundPage"

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/:id?" element={<RoomsLayout />} />
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

export default App
