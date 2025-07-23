export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      <p className="mt-2 text-gray-300 text-lg">Carregando filmes...</p>
    </div>
  )
}
