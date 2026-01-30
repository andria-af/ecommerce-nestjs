"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { buildWhatsappMessage, buildWhatsappUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

export default function ProductClient({
  product,
  settings,
}: {
  product: Product;
  settings: { whatsappNumber: string | null; primaryColor: string };
}) {
  const priceLabel =
    typeof product.priceCents === "number"
      ? formatPrice(product.priceCents)
      : "";
  const message = buildWhatsappMessage(product.title, priceLabel);
  const whatsappUrl = buildWhatsappUrl(
    { whatsappNumber: settings.whatsappNumber ?? "" },
    message,
  );

  return (
    <Box
      sx={{
        bgcolor: settings.primaryColor,
        minHeight: "calc(100dvh - var(--site-header-h) - var(--site-footer-h))",
      }}
    >
      <Container sx={{ py: 4, maxWidth: "sm" }}>
        {/* Header local */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800 }}>
            Produto
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)" }}>
            Finalize pelo WhatsApp
          </Typography>
        </Box>

        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight={700}>
              {product.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {product.description}
            </Typography>

            {typeof product.priceCents === "number" && (
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
    </Box>
  );
}
