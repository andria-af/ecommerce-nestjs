"use client";

import { Box } from "@mui/material";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useEffect, useRef, useState } from "react";
import { alpha, darken, lighten } from "@mui/material/styles";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

type PublicSettings = { primaryColor: string };

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [headerH, setHeaderH] = useState<number>(0);
  const [footerH, setFooterH] = useState<number>(0);

  const [primaryColor, setPrimaryColor] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/public/settings`, { cache: "no-store" })
      .then((r) => r.json())
      .then((s: PublicSettings) => setPrimaryColor(s?.primaryColor ?? null))
      .catch(() => setPrimaryColor(null));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--site-header-h", `${headerH}px`);
  }, [headerH]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const applyFooter = () => {
      const h = footerRef.current?.offsetHeight ?? 0;
      setFooterH(h);
      root.style.setProperty("--site-footer-h", `${h}px`);
    };

    applyFooter();
    const ro = new ResizeObserver(applyFooter);
    if (footerRef.current) ro.observe(footerRef.current);

    window.addEventListener("resize", applyFooter);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyFooter);
    };
  }, []);

  const c = primaryColor && primaryColor.trim() ? primaryColor : "#8b5c99";

  const pageBg = [
    `linear-gradient(135deg, ${lighten(c, 0.1)} 0%, ${c} 40%, ${darken(c, 0.18)} 100%)`,
    `radial-gradient(circle at 18% 20%, ${alpha("#ffffff", 0.22)} 0%, ${alpha(
      "#ffffff",
      0,
    )} 55%)`,
    `radial-gradient(circle at 82% 12%, ${alpha("#000000", 0.16)} 0%, ${alpha(
      "#000000",
      0,
    )} 55%)`,
  ].join(", ");

  return (
    <Box
      ref={rootRef}
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: c,
        backgroundImage: pageBg,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header fixed */}
      <SiteHeader onHeightChange={setHeaderH} />

      {/* Spacer: empurra o conteúdo para baixo do header */}
      <Box sx={{ height: "var(--site-header-h)" }} />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          "& > *": {
            width: "100%",
          },
        }}
      >
        {children}
      </Box>

      <Box ref={footerRef}>
        <SiteFooter />
      </Box>
    </Box>
  );
}
