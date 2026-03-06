import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/getDictionary";
import { TELEGRAM_LINK } from "@/lib/constants";
import { NetworkVisualization } from "./NetworkVisualization";

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
  userCount: string;
}

export function Hero({ dict, locale, userCount }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NetworkVisualization />

      <div className="absolute inset-0 bg-gradient-to-b from-surface-900/50 via-surface-900/80 to-surface-900" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-400/20 bg-brand-400/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-sm text-brand-400 font-medium">
            {userCount} {locale === "fa" ? "نفر متصل شده" : "people connected"}
          </span>
        </div>

        <h1 className="font-[Space_Grotesk] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6">
          {dict.hero.headline}
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-400 leading-relaxed mb-10">
          {dict.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25 text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
            </svg>
            {dict.hero.cta}
          </a>

          <Link
            href={`/${locale}/how-it-works`}
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-white/25 text-white font-semibold rounded-xl transition-all hover:bg-white/5 text-base"
          >
            {dict.hero.ctaSecondary}
            <svg className={`w-4 h-4 ${locale === "fa" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
