"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  alpha,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { adminFetch } from "@/lib/adminApi";
import { formatPrice } from "@/lib/format";
import { Page } from "@/components/ui/Page";
import { SectionCard } from "@/components/ui/SectionCard";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth/logout";
import { useAdminGuard } from "@/lib/auth/useAdminGuard";

type Product = {
  id: string;
  title: string;
  priceCents: number | null;
  active: boolean;
};

type PublicSettings = {
  primaryColor: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export default function AdminProductsPage() {
  useAdminGuard();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [primaryColor, setPrimaryColor] = useState<string | null>(null);

  const accent = useMemo(
    () => (primaryColor && primaryColor.trim() ? primaryColor : null),
    [primaryColor],
  );

  async function load() {
    const data = await adminFetch<Product[]>("/admin/products");
    setProducts(data);
    setLoading(false);
  }

  async function remove(id: string) {
    if (!confirm("Excluir este produto?")) return;

    await adminFetch(`/admin/products/${id}`, { method: "DELETE" });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/public/settings`, { cache: "no-store" })
      .then((r) => r.json())
      .then((s: PublicSettings) => setPrimaryColor(s?.primaryColor ?? null))
      .catch(() => setPrimaryColor(null));
  }, []);

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Serviços cadastrados
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" href="/admin/products/new">
            Novo produto
          </Button>

          <Button variant="outlined" onClick={() => logout(router)}>
            Sair
          </Button>
        </Box>
      </Box>

      <SectionCard>
        {loading && <Typography>Carregando...</Typography>}

        {!loading && products.length === 0 && (
          <Typography color="text.secondary">
            Nenhum produto cadastrado.
          </Typography>
        )}

        {!loading &&
          products.map((p, idx) => (
            <Box key={p.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  py: 1.75,
                  px: 0.5,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: accent
                      ? alpha(accent, 0.06)
                      : "rgba(17,24,39,0.03)",
                  },
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={700} noWrap>
                    {p.title}
                  </Typography>

                  <Typography color="text.secondary" fontSize={14}>
                    {formatPrice(p.priceCents)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    size="small"
                    href={`/admin/products/${p.id}/edit`}
                    sx={{
                      color: accent ?? "primary.main",
                    }}
                  >
                    Editar
                  </Button>

                  <IconButton onClick={() => remove(p.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              {idx < products.length - 1 && <Divider />}
            </Box>
          ))}
      </SectionCard>
    </Page>
  );
}
