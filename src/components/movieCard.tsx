import { Link } from "react-router-dom"
import type { Movie } from "../entities/movie"
import { Card, CardContent } from "./ui/card"
import fallbackPoster from "../assets/fallback-poster.png"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackPoster
  }

  const posterSrc =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : fallbackPoster

  return (
    <Card className="bg-zinc-800 border-zinc-700 hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center">
      <Link
        to={`/movies/${movie.imdbID}`}
        className="block w-full flex flex-col items-center"
      >
        <div className="w-full flex justify-center p-2">
          <img
            src={posterSrc}
            alt={movie.Title}
            className="max-w-[420px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] h-64 sm:h-72 md:h-64 lg:h-80 object-cover rounded"
            loading="lazy"
            onError={handleImageError}
          />
        </div>
        <CardContent className="p-3 sm:p-4 text-center w-full">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {movie.Title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">{movie.Year}</p>
        </CardContent>
      </Link>
    </Card>
  )
}
