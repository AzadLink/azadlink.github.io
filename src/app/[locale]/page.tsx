import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { STATED_USERS, TELEGRAM_LINK } from "@/lib/constants";
import { getGeoStats } from "@/lib/geoStats";
import { Hero } from "@/components/Hero";
import { StatsCounter } from "@/components/StatsCounter";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlobeVisualization } from "@/components/GlobeVisualization";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const geo = getGeoStats();

  const stats = [
    { value: STATED_USERS.iranians, label: dict.stats.iraniansConnected },
    { value: STATED_USERS.chinese, label: dict.stats.chineseConnected },
    { value: STATED_USERS.russians, label: dict.stats.russiansConnected },
    { value: geo.countriesServed, label: dict.stats.countriesServed },
    { value: geo.totalConnections, label: dict.stats.connectionsServed },
  ];

  const totalUsers =
    STATED_USERS.iranians + STATED_USERS.chinese + STATED_USERS.russians;
  const userCountLabel =
    totalUsers >= 1_000_000
      ? `${(totalUsers / 1_000_000).toFixed(1)}M+`
      : `${(totalUsers / 1_000).toFixed(0)}K+`;

  return (
    <>
      <Hero dict={dict} locale={locale as Locale} userCount={userCountLabel} />

      <section className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-800/50 to-surface-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <StatsCounter stats={stats} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-brand-500/[0.02] to-surface-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                  {locale === "fa" ? "داده زنده" : "Live Data"}
                </span>
              </div>
              <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                {dict.globe.title}
              </h2>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                {dict.globe.subtitle}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <GlobeVisualization locale={locale} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
                <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                  {dict.mission.title}
                </span>
              </div>
              <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {dict.mission.title}
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg mb-8">
                {dict.mission.text}
              </p>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors"
              >
                {dict.mission.learnMore}
                <svg className={`w-4 h-4 ${locale === "fa" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-500/10 to-surface-800 border border-white/5 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {["VLESS Reality", "Shadowsocks", "WireGuard", "MTProxy"].map(
                      (protocol, i) => (
                        <div
                          key={protocol}
                          className="bg-surface-900/80 border border-white/5 rounded-xl p-4 text-center hover:border-brand-400/30 transition-colors"
                        >
                          <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-brand-400/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                              {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />}
                              {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />}
                              {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />}
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-white">
                            {protocol}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-gradient-to-b from-surface-900 via-brand-500/5 to-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {locale === "fa" ? "آماده‌اید به اینترنت آزاد متصل شوید؟" : "Ready to Access the Free Internet?"}
            </h2>
            <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
              {locale === "fa"
                ? "به میلیون‌ها نفر بپیوندید که از طریق آزادلینک به اینترنت آزاد دسترسی دارند."
                : "Join millions of people who access the free internet through AzadLink."}
            </p>
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
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
