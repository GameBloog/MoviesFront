const BASE_URL = "http://localhost:3000"

export async function fetchMovies(query?: string) {
  const url = query ? `${BASE_URL}/movies?q=${query}` : `${BASE_URL}/movies`
  const response = await fetch(url)
  return response.json()
}

export async function fetchMovieById(id: string) {
  const response = await fetch(`${BASE_URL}/movies/${id}`)
  if (!response.ok) throw new Error("Failed to fetch movie")
  return response.json()
}
