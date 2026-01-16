export function formatPrice(priceCents: number | null): string | null {
  if (typeof priceCents !== "number") return null;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceCents / 100);
}
