import type { Movie } from "../entities/movie"
import { MovieCard } from "./movieCard"

interface MovieListProps {
  movies: Movie[]
}

export function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  )
}
