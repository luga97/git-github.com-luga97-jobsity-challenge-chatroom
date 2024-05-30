import axios, {AxiosRequestConfig, AxiosResponse} from "axios"
import {useAuth} from "../context/auth/useAuth"
import {useApiErrorManager} from "./useApiErrorManager"
import {useLoading} from "../context/loading/useLoading"

const baseUrl = "http://localhost:5149"

type EndpointWrapperParams = {
  action: "GET" | "POST"
  route: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
  config?: AxiosRequestConfig
  errorHandler?: () => void
  resultHandler: (data: unknown) => void
}

export function useEndpoints() {
  const {startLoading, stopLoading} = useLoading()
  const {token, setToken} = useAuth()
  const apierrorManager = useApiErrorManager()

  async function endpointWrapper({
    action,
    route,
    body,
    config,
    errorHandler,
    resultHandler,
  }: EndpointWrapperParams) {
    startLoading()
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    //JUST FOR TESTING
    //await new Promise((resolve) => setTimeout(resolve, 5000))
    try {
      let response: AxiosResponse
      if (action == "POST") {
        response = await axios.post(`${baseUrl}/${route}`, body, config)
      } else {
        response = await axios.get(`${baseUrl}/${route}`, config)
      }
      resultHandler(response.data)
    } catch (error) {
      apierrorManager(error)
      if (errorHandler) errorHandler()
    }
    stopLoading()
  }

  return {
    sigup: async (username: string, password: string, errorHandler: () => void) => {
      await endpointWrapper({
        action: "POST",
        route: "Auth/SignUp",
        body: {username, password},
        errorHandler,
        resultHandler: (data) => {
          setToken(data as string)
        },
      })
    },

    sigin: async (username: string, password: string, errorHandler: () => void) => {
      await endpointWrapper({
        action: "POST",
        route: "Auth/SignIn",
        body: {username, password},
        errorHandler,
        resultHandler: (data) => {
          setToken(data as string)
        },
      })
    },
    getAllRooms: async (resultHandler: (data: unknown) => void) => {
      endpointWrapper({action: "GET", route: "Rooms", resultHandler})
    },
  }
}
