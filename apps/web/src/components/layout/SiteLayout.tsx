"use client";

import { Box } from "@mui/material";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { useEffect, useRef } from "react";
import { red } from "@mui/material/colors";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const root = rootRef.current;

    const apply = () => {
      const headerH = headerRef.current?.offsetHeight ?? 0;
      const footerH = footerRef.current?.offsetHeight ?? 0;
      root.style.setProperty("--site-header-h", `${headerH}px`);
      root.style.setProperty("--site-footer-h", `${footerH}px`);
    };

    apply();

    const ro = new ResizeObserver(apply);
    if (headerRef.current) ro.observe(headerRef.current);
    if (footerRef.current) ro.observe(footerRef.current);

    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <Box
      ref={rootRef}
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box ref={headerRef}>
        <SiteHeader />
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
          minHeight:
            "calc(100dvh - var(--site-header-h) - var(--site-footer-h))",
          display: "flex",
          backgroundColor: red[50],
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
