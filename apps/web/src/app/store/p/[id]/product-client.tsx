"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

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

export default function ProductClient({ product }: { product: Product }) {
  const whatsappText = encodeURIComponent(
    `Olá! Tenho interesse no produto "${product.title}".\n\n` +
      (product.priceCents
        ? `Valor: R$ ${(product.priceCents / 100)
            .toFixed(2)
            .replace(".", ",")}\n`
        : "") +
      `Poderia me passar mais informações?`
  );

  const whatsappUrl = `https://wa.me/5551992252389?text=${whatsappText}`;

  return (
    <Container sx={{ py: 4, maxWidth: "sm" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" fontWeight={700}>
            {product.title}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {product.description}
          </Typography>

          {formatPrice(product.priceCents) && (
            <Typography
              variant="h5"
              color="primary"
              fontWeight={700}
              sx={{ mt: 2 }}
            >
              {formatPrice(product.priceCents)}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Finalizar pelo WhatsApp
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
