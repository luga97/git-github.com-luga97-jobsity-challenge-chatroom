import {AxiosError} from "axios"
import Swal from "sweetalert2"

import withReactContent from "sweetalert2-react-content"
import {useAuth} from "../context/auth/useAuth"

export function useApiErrorManager() {
  const {releaseToken} = useAuth()
  const showSwal = (title: string) => {
    withReactContent(Swal).fire({
      title: title,
      showConfirmButton: true,
      icon: "error",
    })
  }
  return function (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        console.error(error.response?.data)
        showSwal(error.response?.data)
        return
      }

      if (error.response?.status === 401) {
        showSwal("Your session expired")
        releaseToken()
        return
      }

      if (error.response?.status === 500) {
        showSwal("Something wrong happen, please try again later")
        return
      }
    } else {
      console.error(error)
    }
  }
}
