"use client";

import Link from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { formatPrice } from "@/lib/format";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Grid container spacing={2}>
      {products.map((p) => (
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
                  backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  {p.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {p.description}
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
      ))}
    </Grid>
  );
}
