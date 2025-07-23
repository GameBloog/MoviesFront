import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchMovieById } from "../services/api"
import type { MovieDetail } from "../entities/movieDetail"
import { MovieDetailLoading } from "../components/movieDetailLoading"
import { MovieDetailError } from "../components/movieDetailError"
import fallbackPoster from "../assets/fallback-poster.png"

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    setError("")
    setMovie(null)

    fetchMovieById(id)
      .then(setMovie)
      .catch(() => setError("Filme não encontrado ou erro na busca"))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <MovieDetailLoading />
  if (error) return <MovieDetailError message={error} />
  if (!movie) return null

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackPoster
  }

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : fallbackPoster

  return (
    <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen">
      <Link
        to="/"
        aria-label="Voltar para página inicial"
        className="inline-flex items-center mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        ← Voltar
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left text-white">
        {movie.Title}
        <span className="text-gray-400 font-normal ml-2">({movie.Year})</span>
      </h1>

      <section className="flex flex-col sm:flex-row sm:gap-8 items-center sm:items-start mb-6">
        <img
          src={posterSrc}
          alt={`Poster do filme ${movie.Title}`}
          className="w-full max-w-[280px] flex-shrink-0 rounded shadow-md mb-6 sm:mb-0"
          loading="lazy"
          onError={handleImageError}
        />

        <article className="flex-grow text-base sm:text-lg space-y-4 text-gray-200">
          <div className="space-y-3">
            <p>
              <strong className="text-white">Gênero:</strong> {movie.Genre}
            </p>
            <p>
              <strong className="text-white">Diretor:</strong> {movie.Director}
            </p>
            <p>
              <strong className="text-white">Escritor:</strong> {movie.Writer}
            </p>
            <p>
              <strong className="text-white">Atores:</strong> {movie.Actors}
            </p>
            <p>
              <strong className="text-white">Classificação:</strong>{" "}
              {movie.Rated}
            </p>
            <p>
              <strong className="text-white">Liberação:</strong>{" "}
              {movie.Released}
            </p>
            <p>
              <strong className="text-white">Tempo de exibição:</strong>{" "}
              {movie.Runtime}
            </p>
            <p>
              <strong className="text-white">Linguagem:</strong>{" "}
              {movie.Language}
            </p>
            <p>
              <strong className="text-white">País:</strong> {movie.Country}
            </p>
            <p>
              <strong className="text-white">Prêmios:</strong> {movie.Awards}
            </p>
          </div>
          <div className="pt-4 border-t border-gray-600">
            <p>
              <strong className="text-white">Sinopse:</strong>
            </p>
            <p className="mt-2 leading-relaxed">{movie.Plot}</p>
          </div>
        </article>
      </section>
    </main>
  )
}
