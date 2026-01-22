"use client";

import { useRouter } from "next/navigation";

export function logout(router: ReturnType<typeof useRouter>) {
  localStorage.removeItem("admin_token");
  router.replace("/admin/login");
}
