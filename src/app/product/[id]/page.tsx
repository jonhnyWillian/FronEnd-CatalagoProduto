"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { Product } from "@/types/product";

export default function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {

    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }

    fetchProduct();

  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <Container maxWidth="md">

      <Card>

        <CardMedia
          component="img"
          height="400"
          image={product.thumbnail}
        />

        <CardContent>

          <Typography variant="h4">
            {product.title}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.description}
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            ${product.price}
          </Typography>

        </CardContent>

      </Card>

    </Container>
  );
}