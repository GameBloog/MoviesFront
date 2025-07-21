import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchMovieById } from '../services/api'

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

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    fetchMovieById(id)
      .then(setMovie)
      .catch(() => setError('Filme não encontrado ou erro na busca'))
  }, [id])

  if (error) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="text-blue-600 underline">Voltar</Link>
      </div>
    )
  }

  if (!movie) {
    return <p className="p-4 max-w-3xl mx-auto">Carregando...</p>
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Voltar</Link>

      <h1 className="text-2xl font-bold mb-2">{movie.Title} ({movie.Year})</h1>
      <img src={movie.Poster} alt={movie.Title} className="w-full max-w-sm mb-4" />

      <p><strong>Gênero:</strong> {movie.Genre}</p>
      <p><strong>Diretor:</strong> {movie.Director}</p>
      <p><strong>Atores:</strong> {movie.Actors}</p>
      <p><strong>Classificação:</strong> {movie.Rated}</p>
      <p><strong>Sinopse:</strong> {movie.Plot}</p>
      <p><strong>avaliado:</strong> {movie.Rated}</p>
      <p><strong>Liberação:</strong> {movie.Released}</p>
      <p><strong>Tempo de exibição:</strong> {movie.Runtime}</p>
      <p><strong>Linguagem</strong> {movie.Language}</p>
      <p><strong>País:</strong> {movie.Country}</p>
      <p><strong>Prêmios:</strong> {movie.Awards}</p>
      <p><strong>Poster:</strong> {movie.Poster}</p>
      <p><strong>Escritor:</strong> {movie.Writer}</p>
    </div>
  )
}
