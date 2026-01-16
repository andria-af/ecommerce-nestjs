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

export default async function StorePage() {
  const products = await apiGet<Product[]>("/public/products");

  return (
    <Page title="Produtos" subtitle="Escolha um item e finalize pelo WhatsApp.">
      <SectionCard>
        <ProductGrid products={products} />
      </SectionCard>
    </Page>
  );
}
