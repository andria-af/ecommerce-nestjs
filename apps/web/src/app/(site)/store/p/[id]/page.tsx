import { apiGet } from "@/lib/api";
import ProductClient from "../../product-client";

type Product = {
  id: string;
  title: string;
  description: string;
  priceCents: number | null;
  imageUrl: string | null;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await apiGet<Product>(`/public/products/${id}`);
  const settings = await apiGet<{
    whatsappNumber: string;
    primaryColor: string;
  }>("/public/settings");

  return <ProductClient product={product} settings={settings} />;
}
