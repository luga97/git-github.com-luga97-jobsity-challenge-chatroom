import {Link} from "react-router-dom"

export function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="m-auto w-full font-bold text-2xl mt-10 text-center">
        404 not found
      </div>
      <Link className="underline text-blue-400" to="/">
        go home
      </Link>
    </div>
  )
}
