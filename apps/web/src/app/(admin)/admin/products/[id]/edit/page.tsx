"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { adminFetch } from "@/lib/adminApi";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

export default function AdminProductEditPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const data = await adminFetch<Product>(`/admin/products/${id}`);

      setTitle(data.title);
      setDescription(data.description);
      setPrice(
        typeof data.priceCents === "number"
          ? (data.priceCents / 100).toString()
          : ""
      );
      setImageUrl(data.imageUrl ?? "");
      setLoading(false);
    } catch (e) {
      setError("Erro ao carregar produto");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/admin/login";
      return;
    }

    try {
      await adminFetch(`/admin/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          description,
          priceCents: price ? Math.round(Number(price) * 100) : null,
          imageUrl: imageUrl || null,
        }),
      });

      window.location.href = "/admin/products";
    } catch (e) {
      setError("Erro ao salvar produto");
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Editar Produto
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

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Salvar alterações
        </Button>
      </Box>
    </Container>
  );
}
