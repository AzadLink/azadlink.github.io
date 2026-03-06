import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/getDictionary";
import { TELEGRAM_LINK, GITHUB_LINK } from "@/lib/constants";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const prefix = `/${locale}`;

  return (
    <footer className="border-t border-white/5 bg-surface-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link
              href={prefix}
              className="font-[Space_Grotesk] text-xl font-bold tracking-tight"
            >
              <span className="text-brand-400">Azad</span>
              <span className="text-white">Link</span>
            </Link>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {dict.footer.nav}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`${prefix}/about`} className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/members`} className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  {dict.nav.members}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/how-it-works`} className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  {dict.nav.howItWorks}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {dict.footer.resources}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`${prefix}/faq`} className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  {dict.nav.faq}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/donate`} className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  {dict.nav.donate}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/contact`} className="text-sm text-neutral-400 hover:text-brand-400 transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {dict.footer.connect}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                  </svg>
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@azadlink.org"
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  contact@azadlink.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-sm text-neutral-600 text-center">
            {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
