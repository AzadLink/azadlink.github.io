"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/getDictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const prefix = `/${locale}`;

  const links = [
    { href: prefix, label: dict.nav.home },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/members`, label: dict.nav.members },
    { href: `${prefix}/how-it-works`, label: dict.nav.howItWorks },
    { href: `${prefix}/donate`, label: dict.nav.donate },
    { href: `${prefix}/faq`, label: dict.nav.faq },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={prefix}
            className="font-[Space_Grotesk] text-xl font-bold tracking-tight"
          >
            <span className="text-brand-400">Azad</span>
            <span className="text-white">Link</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
            <LanguageSwitcher locale={locale} />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-surface-900/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
