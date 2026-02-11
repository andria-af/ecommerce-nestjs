import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  p?: number; // padding custom
};

export function SectionCard({ children, p = 3 }: SectionCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent sx={{ p }}>{children}</CardContent>
    </Card>
  );
}
