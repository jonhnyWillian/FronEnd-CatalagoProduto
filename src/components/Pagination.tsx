import { Pagination } from "@mui/material"

interface Props {
  total: number
  page: number
  onChange: (page: number) => void
}

export default function PaginationBar({
  total,
  page,
  onChange,
}: Props) {

  const pages = Math.ceil(total / 10)

  return (
    <Pagination
      count={pages}
      page={page}
      onChange={(_, value) => onChange(value)}
    />
  )
}