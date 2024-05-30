import axios from "axios"
import {useAuth} from "../context/auth/useAuth"
import {useApiErrorManager} from "./useApiErrorManager"
import {useLoading} from "../context/loading/useLoading"

export function useEndpoints() {
  const {loading, startLoading, stopLoading} = useLoading()
  const {setToken} = useAuth()
  const apierrorManager = useApiErrorManager()

  return {
    loading,
    sigup: async (username: string, password: string, errorHandler: () => void) => {
      startLoading()
      //JUST FOR TESTING
      //await new Promise((resolve) => setTimeout(resolve, 5000))
      try {
        const response = await axios.post("http://localhost:5149/Auth/SignUp", {
          username,
          password,
        })
        setToken(response.data)
      } catch (error) {
        apierrorManager(error)
        errorHandler()
      }
      stopLoading()
    },
    sigin: async (username: string, password: string, errorHandler: () => void) => {
      startLoading()
      //JUST FOR TESTING
      //await new Promise((resolve) => setTimeout(resolve, 5000))
      try {
        const response = await axios.post("http://localhost:5149/Auth/SignIn", {
          username,
          password,
        })
        setToken(response.data)
      } catch (error) {
        apierrorManager(error)
        errorHandler()
      }
      stopLoading()
    },
  }
}
