"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAdminGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.replace("/admin/login");
  }, [router]);
}
