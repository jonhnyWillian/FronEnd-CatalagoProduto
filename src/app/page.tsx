"use client";

import { useEffect, useState, useMemo } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

import {
  getProducts,
  getCategories,
  searchProducts,
  getProductsByCategory,
} from "@/services/products";

import { Product } from "@/types/product";

import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import SortBar from "@/components/SortBar";
import PaginationBar from "@/components/Pagination";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("name-asc");

  // metodo para busca produtos
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let data;

      if (search) {
        data = await searchProducts(search);
      } else if (category) {
        data = await getProductsByCategory(category, page);
      } else {
        data = await getProducts(page);
      }

      setProducts(data.products);
      setTotal(data.total);

      setLoading(false);
    }

    fetchProducts();
  }, [page, search, category]);

  // metodo que faz a busca categorias
  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  // metodo que faz a ordenação
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sort) {
      case "name-asc":
        sorted.sort((a, b) =>
          a.title.localeCompare(b.title, "en", {
            sensitivity: "base",
          }),
        );
        break;

      case "name-desc":
        sorted.sort((a, b) =>
          b.title.localeCompare(a.title, "en", {
            sensitivity: "base",
          }),
        );
        break;

      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }

    return sorted;
  }, [products, sort]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="bold" marginTop={4} marginBottom={3}>
        Catálogo de Produtos
      </Typography>

      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Box display="flex" gap={2} marginBottom={3}>
          <SearchBar
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />

          <FilterBar
            categories={categories}
            onSelect={(value) => {
              setCategory(value);
              setPage(1);
            }}
          />

          <SortBar value={sort} onChange={setSort} />
        </Box>

        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <ProductGrid products={sortedProducts} />
        )}

        <Box display="flex" justifyContent="center" marginTop={3}>
          <PaginationBar total={total} page={page} onChange={setPage} />
        </Box>
      </Paper>
    </Container>
  );
}
