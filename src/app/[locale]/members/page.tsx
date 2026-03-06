import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { STATED_USERS, TELEGRAM_LINK, TEAM } from "@/lib/constants";
import { getGeoStats } from "@/lib/geoStats";
import { StatsCounter } from "@/components/StatsCounter";
import { AnimatedSection } from "@/components/AnimatedSection";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const founder = TEAM[0];
  const geo = getGeoStats();

  const totalUsers =
    STATED_USERS.iranians + STATED_USERS.chinese + STATED_USERS.russians;

  const stats = [
    { value: totalUsers, label: locale === "fa" ? "کاربر متصل شده" : "Total Users Connected" },
    { value: geo.totalConnections, label: dict.stats.connectionsServed },
    { value: geo.countriesServed, label: dict.stats.countriesServed },
    { value: 4, label: locale === "fa" ? "پروتکل فعال" : "Active Protocols" },
  ];

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
              <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                {locale === "fa" ? "تیم" : "Team"}
              </span>
            </div>
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {dict.members.title}
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {dict.members.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-surface-800 to-surface-800/50 border border-white/5 rounded-2xl p-8 sm:p-12 hover:border-brand-400/20 transition-colors">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="shrink-0">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-400/20 to-brand-600/20 border border-brand-400/10 flex items-center justify-center">
                    <span className="font-[Space_Grotesk] text-4xl font-bold text-brand-400">
                      {founder.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                </div>

                <div className="text-center sm:text-start flex-1">
                  <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-1">
                    {locale === "fa" ? founder.nameFa : founder.name}
                  </h2>
                  <p className="text-brand-400 font-medium mb-4">
                    {dict.members.founderTitle}
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    {dict.members.founderBio}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-900 via-surface-800/30 to-surface-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white text-center mb-16">
              {dict.members.metricsTitle}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <StatsCounter stats={stats} />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-brand-500/10 to-surface-800 border border-brand-400/20 rounded-2xl p-8 sm:p-12">
              <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white mb-4">
                {dict.members.joinTitle}
              </h2>
              <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">
                {dict.members.joinText}
              </p>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                </svg>
                {dict.members.joinCta}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
