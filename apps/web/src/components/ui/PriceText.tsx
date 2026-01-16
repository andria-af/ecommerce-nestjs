import { Typography } from "@mui/material";
import { formatPrice } from "@/lib/format";

export function PriceText({ value }: { value: number | null }) {
  if (typeof value !== "number") return null;

  return (
    <Typography fontWeight={800} color="primary">
      {formatPrice(value)}
    </Typography>
  );
}
