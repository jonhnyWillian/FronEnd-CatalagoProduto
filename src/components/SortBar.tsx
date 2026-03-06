import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function SortBar({ value, onChange }: Props) {

  return (
    <FormControl sx={{ minWidth: 200 }}>

      <InputLabel>Ordenar</InputLabel>

      <Select
        value={value}
        label="Ordenar"
        onChange={(e) => onChange(e.target.value)}
      >

        <MenuItem value="name-asc">
          Nome (A-Z)
        </MenuItem>

        <MenuItem value="name-desc">
          Nome (Z-A)
        </MenuItem>

        <MenuItem value="price-asc">
          Preço (menor → maior)
        </MenuItem>

        <MenuItem value="price-desc">
          Preço (maior → menor)
        </MenuItem>

      </Select>

    </FormControl>
  )
}