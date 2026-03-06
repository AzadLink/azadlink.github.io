import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { TELEGRAM_LINK, GITHUB_LINK } from "@/lib/constants";
import { AnimatedSection } from "@/components/AnimatedSection";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
              <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                {locale === "fa" ? "تماس" : "Contact"}
              </span>
            </div>
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {dict.contact.title}
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {dict.contact.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 h-full hover:border-brand-400/20 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-brand-400/10 flex items-center justify-center mb-6 group-hover:bg-brand-400/20 transition-colors">
                  <svg className="w-7 h-7 text-brand-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                  </svg>
                </div>
                <h3 className="font-[Space_Grotesk] text-xl font-bold text-white mb-2">
                  {dict.contact.telegramTitle}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {dict.contact.telegramText}
                </p>
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors"
                >
                  {dict.contact.telegramCta}
                  <svg className={`w-4 h-4 ${locale === "fa" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 h-full hover:border-brand-400/20 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-brand-400/10 flex items-center justify-center mb-6 group-hover:bg-brand-400/20 transition-colors">
                  <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-[Space_Grotesk] text-xl font-bold text-white mb-2">
                  {dict.contact.emailTitle}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {dict.contact.emailText}
                </p>
                <a
                  href={`mailto:${dict.contact.emailAddress}`}
                  className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-medium transition-colors"
                >
                  {dict.contact.emailAddress}
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 h-full hover:border-brand-400/20 transition-colors group">
                <div className="w-14 h-14 rounded-xl bg-brand-400/10 flex items-center justify-center mb-6 group-hover:bg-brand-400/20 transition-colors">
                  <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-[Space_Grotesk] text-xl font-bold text-white mb-2">
                  {dict.contact.socialTitle}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {dict.contact.socialText}
                </p>
                <div className="flex gap-3">
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-surface-900/60 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-brand-400 hover:border-brand-400/20 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                    </svg>
                  </a>
                  <a
                    href={GITHUB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-surface-900/60 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-brand-400 hover:border-brand-400/20 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-gradient-to-br from-brand-500/10 to-surface-800 border border-brand-400/20 rounded-2xl p-8 h-full">
                <div className="w-14 h-14 rounded-xl bg-brand-400/10 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-[Space_Grotesk] text-xl font-bold text-white mb-2">
                  {dict.contact.volunteerTitle}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {dict.contact.volunteerText}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={GITHUB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-xl transition-all text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    {locale === "fa" ? "مشارکت در گیت‌هاب" : "Contribute on GitHub"}
                  </a>
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/25 text-white font-semibold rounded-xl transition-all hover:bg-white/5 text-sm"
                  >
                    {dict.contact.volunteerCta}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
