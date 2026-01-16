import { Card, CardContent, Box } from "@mui/material";
import { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
};

export function SectionCard({ children }: SectionCardProps) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Box>{children}</Box>
      </CardContent>
    </Card>
  );
}
