export function MovieDetailLoading() {
  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        <p className="mt-4 text-gray-300 text-lg">
          Carregando detalhes do filme...
        </p>
      </div>
    </div>
  )
}
