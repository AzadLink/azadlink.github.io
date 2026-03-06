import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { STATED_USERS } from "@/lib/constants";
import { getGeoStats } from "@/lib/geoStats";
import { StatsCounter } from "@/components/StatsCounter";
import { AnimatedSection } from "@/components/AnimatedSection";

export default async function AboutPage({
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
  ];

  const protocols = [
    { key: "vless" as const, name: "VLESS Reality & WebSocket" },
    { key: "shadowsocks" as const, name: "Shadowsocks" },
    { key: "wireguard" as const, name: "WireGuard" },
    { key: "mtproxy" as const, name: "MTProxy" },
  ];

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
                <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                  {locale === "fa" ? "درباره ما" : "About"}
                </span>
              </div>
              <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {dict.about.title}
              </h1>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimatedSection>
              <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-4">
                {dict.about.originTitle}
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {dict.about.originText}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-4">
                {dict.about.missionTitle}
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {dict.about.missionText}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-900 via-surface-800/30 to-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-4">
                {dict.about.nonProfitTitle}
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                {dict.about.nonProfitText}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 sm:p-12">
              <h3 className="font-[Space_Grotesk] text-xl sm:text-2xl font-bold text-white mb-3">
                {dict.about.techTitle}
              </h3>
              <p className="text-neutral-400 mb-8">{dict.about.techText}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {protocols.map((p) => (
                  <div
                    key={p.key}
                    className="bg-surface-900/60 border border-white/5 rounded-xl p-5 hover:border-brand-400/20 transition-colors"
                  >
                    <h4 className="text-white font-semibold mb-2">{p.name}</h4>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {dict.about.protocols[p.key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white text-center mb-16">
              {dict.about.impactTitle}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <StatsCounter stats={stats} />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
