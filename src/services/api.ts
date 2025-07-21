const BASE_URL = 'http://localhost:3000'

export async function fetchMovies() {
  const res = await fetch(`${BASE_URL}/movies`)
  if (!res.ok) throw new Error('Failed to fetch movies')
  return res.json()
}

export async function fetchMovieById(id: string) {
  const res = await fetch(`${BASE_URL}/movies/${id}`)
  if (!res.ok) throw new Error('Failed to fetch movie')
  return res.json()
}