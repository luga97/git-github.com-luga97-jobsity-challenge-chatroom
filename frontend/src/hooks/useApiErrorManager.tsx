import {AxiosError} from "axios"

export function useApiErrorManager() {
  return function (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        console.error(error.response?.data)
        return
      }

      if (error.response?.status === 401) {
        //TODO handle unautorized
        return
      }

      if (error.response?.status === 500) {
        //TODO manage any error
        return
      }
    } else {
      console.error(error)
    }
  }
}
