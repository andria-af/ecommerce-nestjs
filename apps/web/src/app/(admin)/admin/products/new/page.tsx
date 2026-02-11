"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { adminFetch } from "@/lib/adminApi";
import UploadService from "@/api/services/Upload";

export default function AdminProductNewPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePickFile(file?: File | null) {
    if (!file) return;
    setError(null);
    setImageUploading(true);
    try {
      const res = await UploadService.uploadImage(file);
      setImageUrl(res.url);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao enviar imagem");
    } finally {
      setImageUploading(false);
    }
  }

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
          imageUrl, // <-- vem do upload
        }),
      });

      window.location.href = "/admin/products";
    } catch (err: any) {
      setError(err?.message ?? "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Novo Produto
      </Typography>

      <Card>
        <CardContent>
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

            {/* Upload */}
            <Box sx={{ mt: 2 }}>
              <Typography fontWeight={700} sx={{ mb: 1 }}>
                Imagem
              </Typography>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Button
                  component="label"
                  variant="outlined"
                  disabled={imageUploading || loading}
                >
                  {imageUploading ? "Enviando..." : "Selecionar arquivo"}
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePickFile(e.target.files?.[0])}
                  />
                </Button>

                {imageUrl && (
                  <Button
                    variant="text"
                    color="error"
                    disabled={imageUploading || loading}
                    onClick={() => setImageUrl(null)}
                  >
                    Remover
                  </Button>
                )}
              </Box>

              {imageUrl && (
                <Box
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.12)",
                    bgcolor: "rgba(0,0,0,0.15)",
                  }}
                >
                  <Box
                    component="img"
                    src={imageUrl}
                    alt="Preview"
                    sx={{ width: "100%", height: 220, objectFit: "cover" }}
                  />
                </Box>
              )}
            </Box>

            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading || imageUploading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
