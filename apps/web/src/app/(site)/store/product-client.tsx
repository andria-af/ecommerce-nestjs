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
import { assetUrl } from "@/lib/assetUrl";

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
  const img = assetUrl(product.imageUrl);

  return (
    <Box>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ color: "#fff", fontWeight: 900 }}>
            Detalhes
          </Typography>
        </Box>

        <Card>
          <CardContent
            sx={{
              p: 0,
              "&:last-child": {
                pb: 0,
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
                minHeight: { md: 260 }, // controla altura mínima do card
              }}
            >
              {/* CONTEÚDO ESQUERDO */}
              <Box
                sx={{
                  p: { xs: 2.5, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" fontWeight={800}>
                  {product.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1.5, lineHeight: 1.7 }}
                >
                  {product.description}
                </Typography>

                {typeof product.priceCents === "number" && (
                  <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={800}
                    sx={{ mt: 2.5 }}
                  >
                    {formatPrice(product.priceCents)}
                  </Typography>
                )}

                <Button
                  size="large"
                  variant="contained"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 3, maxWidth: 320, height: 48 }}
                >
                  Agendar
                </Button>
              </Box>

              {/* IMAGEM DIREITA – ALTURA TOTAL */}
              {img && (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: { xs: 180, md: "100%" },
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    overflow: "hidden",
                  }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
