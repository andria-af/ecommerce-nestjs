"use client";

import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { adminFetch } from "@/lib/adminApi";

export default function AdminProductNewPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await adminFetch("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          priceCents: price ? Math.round(Number(price) * 100) : null,
          imageUrl: imageUrl || null,
        }),
      });
      window.location.href = "/admin/products";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Novo Produto
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          label="Preço (R$)"
          fullWidth
          margin="normal"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          label="Imagem (URL)"
          fullWidth
          margin="normal"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          Salvar
        </Button>
      </Box>
    </Container>
  );
}
