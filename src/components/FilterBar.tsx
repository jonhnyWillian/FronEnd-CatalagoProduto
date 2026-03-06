import { MenuItem, Select } from "@mui/material"
import { Category } from "@/types/category"

interface Props {
  categories: Category[]
  onSelect: (category: string) => void
}

export default function FilterBar({ categories, onSelect }: Props) {
  return (
    <Select
      fullWidth
      defaultValue=""
      onChange={(e) => onSelect(e.target.value)}
    >
      <MenuItem value="">Todas</MenuItem>

      {categories.map((cat) => (
        <MenuItem key={cat.slug} value={cat.slug}>
          {cat.name}
        </MenuItem>
      ))}
    </Select>
  )
}