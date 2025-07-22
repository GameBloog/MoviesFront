import { useState, useEffect } from 'react'
import { fetchMovies } from '../services/api'
import { Link } from 'react-router-dom'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true)
      fetchMovies(search)
        .then(setMovies)
        .finally(() => setLoading(false))
    }, 300) 

    return () => clearTimeout(delayDebounce)
  }, [search])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white font-sans p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">🎬 Movie Explorer</h1>

      <div className="w-full max-w-xl mb-8 sm:mb-10">
        <input
          type="text"
          placeholder="Pesquise um filme..."
          className="
            w-full
            px-4 py-2 sm:px-5 sm:py-3
            text-black
            rounded-lg
            shadow-md
            focus:outline-none
            focus:ring-4
            focus:ring-blue-500
            transition
            duration-300
            text-sm sm:text-base
          "
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-300 animate-pulse">🔎 Carregando filmes...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto px-2 sm:px-0 w-full">
  {movies.map(movie => (
    <li
      key={movie.imdbID}
      className="bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <Link to={`/movies/${movie.imdbID}`} className="block">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-64 sm:h-72 md:h-80 lg:h-72 object-cover"
          loading="lazy"
        />
        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold">{movie.Title}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{movie.Year}</p>
        </div>
      </Link>
    </li>
  ))}
</ul>
      )}
    </div>
  )
}