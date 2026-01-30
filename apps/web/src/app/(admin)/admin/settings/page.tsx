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
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";
import { useAdminGuard } from "@/lib/auth/useAdminGuard";
import { adminFetch } from "@/lib/adminApi";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { IPublicSettings } from "@/api/services/PublicSettings";

export default function AdminSettingsPage() {
  useAdminGuard();
  const router = useRouter();

  const [settings, setSettings] = useState<IPublicSettings | null>(null);
  const [loading, setLoading] = useState(false);

  // Toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastSeverity, setToastSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  useEffect(() => {
    adminFetch<IPublicSettings>("/admin/settings").then(setSettings);
  }, []);

  if (!settings) return null;

  async function handleSave() {
    if (!settings) return;

    const s = settings; // <- trava o type (não-null)

    setLoading(true);
    try {
      const updated = await adminFetch<IPublicSettings>("/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({
          primaryColor: s.primaryColor,
          whatsappNumber: s.whatsappNumber,
          instagramUrl: s.instagramUrl,
          homeImageUrl: s.homeImageUrl,
        }),
      });

      setSettings(updated);

      setToastSeverity("success");
      setToastMsg("Configurações salvas com sucesso");
      setToastOpen(true);

      setTimeout(() => {
        router.refresh();
        window.location.reload();
      }, 700);
    } catch {
      setToastSeverity("error");
      setToastMsg("Erro ao salvar configurações");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file: File) {
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await adminFetch<{ url: string }>("/upload", {
        method: "POST",
        body: form,
      });

      setSettings((prev) => (prev ? { ...prev, homeImageUrl: res.url } : prev));

      setToastSeverity("success");
      setToastMsg("Imagem enviada com sucesso");
      setToastOpen(true);
    } catch {
      setToastSeverity("error");
      setToastMsg("Erro ao enviar imagem");
      setToastOpen(true);
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Configurações
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            component={Link}
            href="/"
            aria-label="Início"
            sx={{
              color: "primary.main",
              border: "1px solid rgba(17,24,39,0.10)",
              borderRadius: 2,
            }}
          >
            <HomeOutlinedIcon />
          </IconButton>

          <Button variant="outlined" onClick={() => logout(router)}>
            Sair
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Estilo
              </Typography>

              <Grid container spacing={2}>
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

      {/* TOAST */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
