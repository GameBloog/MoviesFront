import { Link } from "react-router-dom"

interface MovieDetailErrorProps {
  message: string
}

export function MovieDetailError({ message }: MovieDetailErrorProps) {
  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen flex flex-col justify-center items-center text-center">
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-6">
        <p className="text-red-400 text-lg mb-4">{message}</p>
      </div>
      <Link
        to="/"
        aria-label="Voltar para página inicial"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        ← Voltar para Home
      </Link>
    </div>
  )
}
