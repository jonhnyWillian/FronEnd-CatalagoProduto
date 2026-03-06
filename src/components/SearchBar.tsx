"use client"
import { TextField } from "@mui/material"
import React, { useState } from "react"

interface Props {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("")
  
  function handleKeyDown(e: React.KeyboardEvent){
    if (e.key === "Enter"){
      onSearch(value)
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const newValue = e.target.value
    setValue(newValue)

    //Buscar enquanto digitar
    onSearch(newValue)
  }
  
  return (
    <TextField
      label="Buscar produto"
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}