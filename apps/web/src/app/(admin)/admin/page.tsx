"use client";

import Link from "next/link";
import { useAdminGuard } from "@/lib/auth/useAdminGuard";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const items = [
  {
    title: "Gerenciar produtos",
    description: "Criar, editar e remover produtos.",
    href: "/admin/products",
  },
  {
    title: "Gerenciar estilo",
    description: "Cor do site, imagem da home, Instagram e WhatsApp.",
    href: "/admin/settings",
  },
];

export default function AdminHomePage() {
  useAdminGuard();
  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 4,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Painel do vendedor
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid
            key={item.href}
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardActionArea
                component={Link}
                href={item.href}
                sx={{
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
