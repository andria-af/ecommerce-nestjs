"use client";

import Link from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { formatPrice } from "@/lib/format";
import { assetUrl } from "@/lib/assetUrl";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // mobile: 1 por linha
          md: "repeat(2, 1fr)", // desktop: 2 por linha
        },
        gap: 3,
      }}
    >
      {products.map((p) => {
        const img = assetUrl(p.imageUrl);

        return (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                href={`/store/p/${p.id}`}
                sx={{ height: "100%" }}
              >
                <Box
                  sx={{
                    height: 180,
                    bgcolor: "rgba(17,24,39,0.04)",
                    backgroundImage: img ? `url("${img}")` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight={700}>
                    {p.title}
                  </Typography>

                  {typeof p.priceCents === "number" && (
                    <Typography sx={{ mt: 1 }} fontWeight={700} color="primary">
                      {formatPrice(p.priceCents)}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
