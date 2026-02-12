import { apiGet } from "@/lib/api";
import ProductClient from "../../product-client";
import { getPublicSettingsSafe } from "@/lib/publicSettings";

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
  const settings = await getPublicSettingsSafe();

  return <ProductClient product={product} settings={settings} />;
}
