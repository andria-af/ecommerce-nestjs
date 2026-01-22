"use client";

import { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
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

export default function AdminProductsPage() {
  useAdminGuard();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const data = await adminFetch<Product[]>("/admin/products");
    setProducts(data);
    setLoading(false);
  }

  async function remove(id: string) {
    if (!confirm("Excluir este produto?")) return;

    await adminFetch(`/admin/products/${id}`, {
      method: "DELETE",
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Produtos
          </Typography>
          <Typography color="text.secondary">
            Gerencie os produtos da loja
          </Typography>
        </Box>

        <Button variant="outlined" onClick={() => logout(router)}>
          Sair
        </Button>
      </Box>

      <SectionCard>
        {loading && <Typography>Carregando...</Typography>}

        {!loading &&
          products.map((p) => (
            <Box
              key={p.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                py: 1.5,
              }}
            >
              <Box>
                <Typography fontWeight={700}>{p.title}</Typography>
                <Typography color="text.secondary" fontSize={14}>
                  {formatPrice(p.priceCents)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button size="small" href={`/admin/products/${p.id}/edit`}>
                  Editar
                </Button>

                <IconButton onClick={() => remove(p.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
      </SectionCard>
    </Page>
  );
}
