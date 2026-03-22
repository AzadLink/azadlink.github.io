import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { STATED_USERS, TELEGRAM_LINK, GITHUB_LINK, LINKEDIN_LINK, TEAM } from "@/lib/constants";
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
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                <a
                  href={GITHUB_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  {locale === "fa" ? "مشارکت در گیت‌هاب" : "Contribute on GitHub"}
                </a>
                <a
                  href={LINKEDIN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/10 hover:border-white/25 text-white font-semibold rounded-xl transition-all hover:bg-white/5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {locale === "fa" ? "لینکدین" : "LinkedIn"}
                </a>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/10 hover:border-white/25 text-white font-semibold rounded-xl transition-all hover:bg-white/5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                  </svg>
                  {dict.members.joinCta}
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
