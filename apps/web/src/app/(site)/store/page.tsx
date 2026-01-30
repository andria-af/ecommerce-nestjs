import { Box } from "@mui/material";
import { apiGet } from "@/lib/api";
import { Page } from "@/components/ui/Page";
import { SectionCard } from "@/components/ui/SectionCard";
import { ProductGrid } from "./ProductGrid";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

type PublicSettings = {
  primaryColor: string;
};

export default async function StorePage() {
  const [products, settings] = await Promise.all([
    apiGet<Product[]>("/public/products"),
    apiGet<PublicSettings>("/public/settings"),
  ]);

  return (
    <Box
      sx={{
        bgcolor: settings.primaryColor,
        // deixa mais “clean” no fundo
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)",
      }}
    >
      {/* Header local da página (acima do conteúdo) */}
      <Box
        sx={{
          pt: { xs: 3, md: 5 },
          pb: { xs: 2, md: 3 },
        }}
      >
        <Page
          title="Produtos"
          subtitle="Escolha um item e finalize pelo WhatsApp."
        >
          <SectionCard>
            <ProductGrid products={products} />
          </SectionCard>
        </Page>
      </Box>
    </Box>
  );
}
