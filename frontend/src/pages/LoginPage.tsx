import axios from "axios"
import {useAuth} from "../context/auth/useAuth"
import {Link} from "react-router-dom"
import {useApiErrorManager} from "../hooks/useApiErrorManager"

export function LoginPage() {
  const {setToken} = useAuth()
  const apierrorManager = useApiErrorManager()

  function handleSignIn() {
    const sendLogin = async () => {
      try {
        const response = await axios.post("http://localhost:5149/Auth/SignIn", {
          username: "luis",
          password: "123456",
        })
        setToken(response.data)
      } catch (error) {
        apierrorManager(error)
      }
    }
    sendLogin()
  }

  function handleSignUp() {
    const sendLogin = async () => {
      try {
        const response = await axios.post("http://localhost:5149/Auth/SignUp", {
          username: "luis",
          password: "123456",
        })
        setToken(response.data)
        console.log("Success login")
      } catch (error) {
        apierrorManager(error)
      }
    }
    sendLogin()
  }

  return (
    <div className="p-10">
      <button className="mr-6" onClick={handleSignIn}>
        Login
      </button>
      <button onClick={handleSignUp}>SignUp</button>
      <Link to={"about"}>Go to about</Link>
    </div>
  )
}
