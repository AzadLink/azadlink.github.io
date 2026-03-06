import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { TELEGRAM_LINK } from "@/lib/constants";
import { AnimatedSection } from "@/components/AnimatedSection";

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const impactStats = [
    { label: dict.donate.stat1Label, value: dict.donate.stat1Value },
    { label: dict.donate.stat2Label, value: dict.donate.stat2Value },
    { label: dict.donate.stat3Label, value: dict.donate.stat3Value },
  ];

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-400/20 bg-accent-400/5 mb-6">
              <span className="text-xs text-accent-400 font-semibold uppercase tracking-wider">
                {locale === "fa" ? "حمایت" : "Support"}
              </span>
            </div>
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {dict.donate.title}
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {dict.donate.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 sm:p-12 mb-12">
              <h2 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white mb-4">
                {dict.donate.impactTitle}
              </h2>
              <p className="text-neutral-400 leading-relaxed text-lg mb-10">
                {dict.donate.impactText}
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                {impactStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface-900/60 border border-white/5 rounded-xl p-6 text-center hover:border-accent-400/20 transition-colors"
                  >
                    <div className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-accent-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-accent-400/10 to-surface-800 border border-accent-400/20 rounded-2xl p-8 sm:p-10 h-full flex flex-col">
                <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white mb-4">
                  {dict.donate.donateTitle}
                </h2>
                <p className="text-neutral-400 leading-relaxed mb-8 flex-1">
                  {dict.donate.donateText}
                </p>

                <div className="bg-surface-900/60 border border-dashed border-white/10 rounded-xl p-8 text-center mb-6">
                  <svg className="w-12 h-12 text-neutral-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-neutral-500 font-medium">
                    {dict.donate.comingSoon}
                  </p>
                </div>

                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-accent-500 hover:bg-accent-400 text-black font-semibold rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                  </svg>
                  {dict.donate.contactDonate}
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 sm:p-10 h-full">
                <div className="w-14 h-14 rounded-xl bg-brand-400/10 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="font-[Space_Grotesk] text-2xl font-bold text-white mb-4">
                  {dict.donate.transparencyTitle}
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  {dict.donate.transparencyText}
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    locale === "fa" ? "هاستینگ سرور و پهنای باند" : "Server hosting & bandwidth",
                    locale === "fa" ? "ثبت و نگهداری دامنه" : "Domain registration & maintenance",
                    locale === "fa" ? "توسعه ابزارهای ضد سانسور" : "Anti-censorship tool development",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-brand-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
