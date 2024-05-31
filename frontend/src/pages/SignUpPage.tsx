import {useState} from "react"
import {useEndpoints} from "../hooks/useEndpoints"
import {Link} from "react-router-dom"

export function SignUpPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {sigup} = useEndpoints()
  function handleSignIn() {
    if (!username || !password) {
      setError("Username and password required")
      return
    }
    setError("")
    sigup(username, password, loginFailedHandler)
  }

  function loginFailedHandler() {
    setError("error")
  }

  return (
    <div
      onKeyUp={(e) => {
        return e.key == "Enter" && handleSignIn()
      }}
      className="h-screen flex-col bg-blue-100 flex justify-center items-center"
    >
      <span className="text-2xl font-semibold text-gray-700">Sign Up</span>
      <span className="text-sm text-gray-500 font-semibold mb-4 mt-2">
        Welcome to Chatrooms
      </span>
      <div className="rounded-xl flex flex-col items-stretch gap-4 bg-white w-1/2 p-10 max-w-lg min-w-max">
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            className={` border ${
              error
                ? "border-red-200 focus:outline-red-400"
                : "border-blue-200 focus:outline-blue-400"
            } rounded p-2 `}
            value={username}
            placeholder="Enter username"
            onChange={(e) => {
              setUsername(e.target.value)
              setError("")
            }}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label className="">Password</label>
          <input
            className={` border ${
              error
                ? "border-red-200 focus:outline-red-400"
                : "border-blue-200 focus:outline-blue-400"
            } rounded p-2 `}
            value={password}
            placeholder="Enter password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
              setError("")
            }}
          ></input>
        </div>
        <button
          className="rounded bg-blue-500 text-white p-2 focus:outline-blue-300"
          onClick={handleSignIn}
        >
          Sign Up
        </button>
        {error && <span className="text-center text-red-500">{error}</span>}
        <span className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to={"/signIn"}>
            <span className="text-blue-500 cursor-pointer">Signin now</span>
          </Link>
        </span>
      </div>
    </div>
  )
}
