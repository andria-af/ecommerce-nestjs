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
        minHeight: "calc(100dvh - var(--site-header-h) - var(--site-footer-h))",
      }}
    >
      <Box sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 2, md: 3 } }}>
        <Page
          title="Serviços"
          titleSx={{
            color: "#fff",
            fontStyle: "italic",
            fontFamily: '"Cormorant Garamond", Inter, system-ui, sans-serif',
            textShadow: "0 6px 18px rgba(0,0,0,0.25)",
          }}
        >
          <SectionCard>
            <ProductGrid products={products} />
          </SectionCard>
        </Page>
      </Box>
    </Box>
  );
}
