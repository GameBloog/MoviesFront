import { Input } from "./ui/input"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Pesquise um filme...",
}: SearchInputProps) {
  return (
    <div className="w-full max-w-xl mb-8 sm:mb-10">
      <Input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 sm:px-5 sm:py-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
