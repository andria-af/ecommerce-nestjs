"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";
import UploadService from "@/api/services/Upload";
import PublicSettingsService, {
  IPublicSettings,
} from "@/api/services/PublicSettings";
import { useAdminGuard } from "@/lib/auth/useAdminGuard";
import { adminFetch } from "@/lib/adminApi";

export default function AdminSettingsPage() {
  useAdminGuard();
  const router = useRouter();
  const [settings, setSettings] = useState<IPublicSettings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminFetch<IPublicSettings>("/admin/settings").then(setSettings);
  }, []);

  if (!settings) return null;

  async function handleSave() {
    if (!settings) return;
    setLoading(true);
    try {
      const updated = await adminFetch<IPublicSettings>("/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({
          primaryColor: settings.primaryColor,
          whatsappNumber: settings.whatsappNumber,
          instagramUrl: settings.instagramUrl,
          homeImageUrl: settings.homeImageUrl,
        }),
      });

      setSettings(updated);
      alert("Configurações salvas com sucesso");
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file: File) {
    const form = new FormData();
    form.append("file", file);

    const res = await adminFetch<{ url: string }>("/upload", {
      method: "POST",
      body: form,
    });

    setSettings((prev) => (prev ? { ...prev, homeImageUrl: res.url } : prev));
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Configurações
        </Typography>

        <Button variant="outlined" onClick={() => logout(router)}>
          Sair
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* BLOCO 1: ESTILO */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Estilo
              </Typography>

              <Grid container spacing={2}>
                {/* Cor principal */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography fontWeight={600} mb={1}>
                    Cor principal
                  </Typography>
                  <TextField
                    fullWidth
                    type="color"
                    value={settings.primaryColor ?? "#000000"}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        primaryColor: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* WhatsApp */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography fontWeight={600} mb={1}>
                    WhatsApp
                  </Typography>
                  <TextField
                    fullWidth
                    value={settings.whatsappNumber}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        whatsappNumber: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* Instagram */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography fontWeight={600} mb={1}>
                    Instagram
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="https://instagram.com/..."
                    value={settings.instagramUrl ?? ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        instagramUrl: e.target.value,
                      })
                    }
                  />
                </Grid>

                {/* Imagem da home */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography fontWeight={600} mb={1}>
                    Imagem da home
                  </Typography>

                  <Button variant="outlined" component="label">
                    Selecionar imagem
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </Button>

                  {settings.homeImageUrl && (
                    <Box
                      component="img"
                      src={settings.homeImageUrl}
                      alt="Preview"
                      sx={{
                        mt: 2,
                        width: "100%",
                        maxHeight: 200,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  )}
                </Grid>

                {/* Salvar */}
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    Salvar alterações
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* BLOCO 2: PRODUTOS */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Produtos
              </Typography>

              <Button
                component={Link}
                href="/admin/products"
                variant="contained"
                size="large"
              >
                Gerenciar produtos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
