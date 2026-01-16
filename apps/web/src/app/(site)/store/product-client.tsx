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
  settings: { whatsappNumber: string };
}) {
  const priceLabel = formatPrice(product.priceCents);
  const message = buildWhatsappMessage(product.title, priceLabel);
  const whatsappUrl = buildWhatsappUrl(settings, message);

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
