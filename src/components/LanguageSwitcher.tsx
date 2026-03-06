"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/getDictionary";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "en" ? "fa" : "en";
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`);

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-white/10 rounded-full text-neutral-300 hover:text-white hover:border-brand-400/50 transition-all"
    >
      {targetLocale === "fa" ? "فارسی" : "English"}
    </Link>
  );
}
