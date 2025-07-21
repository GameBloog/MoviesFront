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

  useEffect(() => {
    fetchMovies().then(setMovies)
  }, [])

  const filteredMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Buscar filmes..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <ul className="grid grid-cols-2 gap-4">
        {filteredMovies.map(movie => (
          <li key={movie.imdbID} className="border p-2 rounded hover:shadow-lg">
            <Link to={`/movies/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover mb-2" />
              <h3 className="font-bold">{movie.Title}</h3>
              <p>{movie.Year}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}