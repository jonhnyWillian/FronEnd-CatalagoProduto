import { ProductsResponse } from "@/types/product"

const BASE_URL = "https://dummyjson.com"

export async function getProducts(page: number) {
  const limit = 10
  const skip = (page - 1) * limit

  const res = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  )
  
  return res.json() as Promise<ProductsResponse>
}

export async function searchProducts(query: string) {
  const res = await fetch(
    `${BASE_URL}/products/search?q=${query}`
  )

  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`)
  return res.json()
}

export async function getProductsByCategory(
  category: string,
  page: number
) {
  const limit = 10
  const skip = (page - 1) * limit

  const res = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`
  )

  return res.json()
}