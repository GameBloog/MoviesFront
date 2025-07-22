import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { fetchMovieById } from "../services/api"

interface Rating {
  Source: string
  Value: string
}

interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
}

function Loading() {
  return (
    <p className="p-4 max-w-3xl mx-auto min-h-screen flex items-center justify-center text-gray-300 text-lg">
      Carregando...
    </p>
  )
}

function Error({ message }: { message: string }) {
  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen flex flex-col justify-center items-center text-center">
      <p className="text-red-600 mb-4">{message}</p>
      <Link
        to="/"
        aria-label="Voltar para página inicial"
        className="text-blue-600 underline hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        Voltar
      </Link>
    </div>
  )
}

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

  if (loading) return <Loading />
  if (error) return <Error message={error} />
  if (!movie) return null

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "/fallback-poster.png"

  return (
    <main className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen">
      <Link
        to="/"
        aria-label="Voltar para página inicial"
        className="inline-block mb-6 text-blue-600 underline hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
      >
        ← Voltar
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left">
        {movie.Title}{" "}
        <span className="text-gray-400 font-normal">({movie.Year})</span>
      </h1>

      <section className="flex flex-col sm:flex-row sm:gap-8 items-center sm:items-start mb-6">
        <img
          src={posterSrc}
          alt={`Poster do filme ${movie.Title}`}
          className="w-full max-w-[280px] flex-shrink-0 rounded shadow-md mb-6 sm:mb-0"
          loading="lazy"
        />

        <article className="flex-grow text-base sm:text-lg space-y-4 text-gray-200">
          <p>
            <strong>Gênero:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Diretor:</strong> {movie.Director}
          </p>
          <p>
            <strong>Escritor:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Atores:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Classificação:</strong> {movie.Rated}
          </p>
          <p>
            <strong>Liberação:</strong> {movie.Released}
          </p>
          <p>
            <strong>Tempo de exibição:</strong> {movie.Runtime}
          </p>
          <p>
            <strong>Linguagem:</strong> {movie.Language}
          </p>
          <p>
            <strong>País:</strong> {movie.Country}
          </p>
          <p>
            <strong>Prêmios:</strong> {movie.Awards}
          </p>
          <p>
            <strong>Sinopse:</strong> <br />
            {movie.Plot}
          </p>
        </article>
      </section>
    </main>
  )
}
