"use client";

import { useState } from "react";
import { Product } from "@/types/product";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Paper,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Rating,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpen(product: Product) {
    setSelectedProduct(product);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <b>Imagem</b>
              </TableCell>
              <TableCell>
                <b>Nome</b>
              </TableCell>
              <TableCell>
                <b>Categoria</b>
              </TableCell>
              <TableCell>
                <b>Preço</b>
              </TableCell>
              <TableCell>
                <b>Rating</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpen(product)}
              >
                <TableCell>
                  <Avatar
                    src={product.thumbnail}
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>

                <TableCell>{product.title}</TableCell>

                <TableCell sx={{ textTransform: "capitalize" }}>
                  {product.category}
                </TableCell>

                <TableCell>${product.price}</TableCell>

                <TableCell>
                  <Rating value={product.rating} precision={0.5} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedProduct?.title}

          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedProduct && (
            <Box>
              <Box
                component="img"
                src={selectedProduct.thumbnail}
                sx={{
                  width: "100%",
                  maxHeight: 350,
                  objectFit: "contain",
                  mb: 2,
                }}
              />

              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedProduct.description}
              </Typography>

              <Typography>
                <b>Categoria:</b> {selectedProduct.category}
              </Typography>

              <Typography>
                <b>Preço:</b> ${selectedProduct.price}
              </Typography>

              <Typography
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <b>Rating:</b>
                <Rating
                  value={selectedProduct.rating}
                  precision={0.5}
                  readOnly
                />
                ({selectedProduct.rating})
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
