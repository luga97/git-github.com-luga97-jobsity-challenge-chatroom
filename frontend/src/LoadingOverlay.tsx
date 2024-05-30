import {useLoading} from "./context/loading/useLoading"

// Componente para mostrar el overlay de carga global
export function LoadingOverlay() {
  const {loading} = useLoading()

  return (
    loading && (
      <div className="loading-overlay">
        <div className="loading-indicator">Loading...</div>
      </div>
    )
  )
}
