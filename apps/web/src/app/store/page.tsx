import { apiGet } from "@/lib/api";
import Link from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

function formatPrice(priceCents: number | null) {
  if (typeof priceCents !== "number") return null;
  return `R$ ${(priceCents / 100).toFixed(2).replace(".", ",")}`;
}

export default async function StorePage() {
  const products = await apiGet<Product[]>("/public/products");

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Produtos
        </Typography>
        <Typography color="text.secondary">
          Escolha um item e finalize pelo WhatsApp.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Link
              href={`/store/p/${p.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                      {p.title}
                    </Typography>

                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                      {p.description}
                    </Typography>

                    {formatPrice(p.priceCents) && (
                      <Typography
                        sx={{ mt: 1 }}
                        fontWeight={700}
                        color="primary"
                      >
                        {formatPrice(p.priceCents)}
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
