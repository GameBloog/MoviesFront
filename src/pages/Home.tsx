import { useState, useEffect } from "react"
import { fetchMovies } from "../services/api"
import type { Movie } from "../entities/movie"
import { useDebounce } from "../hooks/useDebounce"
import { SearchInput } from "../components/searchInput"
import { MovieList } from "../components/movieList"
import { LoadingSpinner } from "../components/loadingSpinner"

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    setLoading(true)
    fetchMovies(debouncedSearch)
      .then(setMovies)
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white font-sans p-4 sm:p-6 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center">
        🎬 Movie Explorer
      </h1>

      <SearchInput value={search} onChange={setSearch} />

      <div className="w-full max-w-7xl px-4 sm:px-6">
        {loading ? <LoadingSpinner /> : <MovieList movies={movies} />}
      </div>
    </div>
  )
}
