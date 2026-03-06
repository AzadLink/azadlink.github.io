import { getDictionary, type Locale } from "@/i18n/getDictionary";
import { TELEGRAM_LINK } from "@/lib/constants";
import { AnimatedSection } from "@/components/AnimatedSection";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const steps = [
    {
      number: "01",
      title: dict.howItWorks.step1Title,
      text: dict.howItWorks.step1Text,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      ),
    },
    {
      number: "02",
      title: dict.howItWorks.step2Title,
      text: dict.howItWorks.step2Text,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
      ),
    },
    {
      number: "03",
      title: dict.howItWorks.step3Title,
      text: dict.howItWorks.step3Text,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      ),
    },
    {
      number: "04",
      title: dict.howItWorks.step4Title,
      text: dict.howItWorks.step4Text,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  ];

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-400/20 bg-brand-400/5 mb-6">
              <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">
                {locale === "fa" ? "راهنما" : "Guide"}
              </span>
            </div>
            <h1 className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {dict.howItWorks.title}
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {dict.howItWorks.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute top-0 bottom-0 start-[39px] w-px bg-gradient-to-b from-brand-400/50 via-brand-400/20 to-transparent hidden sm:block" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <AnimatedSection key={step.number} delay={i * 0.1}>
                  <div className="flex gap-6 sm:gap-8">
                    <div className="shrink-0 relative z-10">
                      <div className="w-20 h-20 rounded-2xl bg-surface-800 border border-brand-400/20 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-brand-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          {step.icon}
                        </svg>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="font-[Space_Grotesk] text-sm font-bold text-brand-400/60 mb-1 block">
                        {step.number}
                      </span>
                      <h3 className="font-[Space_Grotesk] text-xl sm:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-b from-surface-900 via-surface-800/30 to-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-surface-800/50 border border-white/5 rounded-2xl p-8 sm:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-400/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-[Space_Grotesk] text-xl sm:text-2xl font-bold text-white mb-2">
                    {dict.howItWorks.securityTitle}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {dict.howItWorks.securityText}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-[Space_Grotesk] text-3xl sm:text-4xl font-bold text-white mb-6">
              {locale === "fa" ? "همین الان شروع کنید" : "Get Started Now"}
            </h2>
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-500 hover:bg-brand-400 text-black font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-brand-500/25"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
              </svg>
              {locale === "fa" ? "عضویت در تلگرام" : "Join via Telegram"}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
